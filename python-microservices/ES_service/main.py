from fastapi import FastAPI, HTTPException, UploadFile, File, Query
from fastapi.responses import StreamingResponse
from elasticsearch import Elasticsearch, helpers
from sentence_transformers import SentenceTransformer, util
import os
from pathlib import Path
from typing import List
from docx import Document
import comtypes.client
import magic
import re
from prisma import Prisma
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import numpy as np

# Инициализация FastAPI
app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://localhost:3030",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8001",
    "http://localhost:8002",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Подключение к ElasticSearch
# Учетные данные для аутентификации
username = "elastic"
password = "q9WVtYRO04h-UQAa=FeW"

# Подключение к ElasticSearch с аутентификацией
es = Elasticsearch(
    [{'host': 'localhost', 'port': 9200, "scheme": "https"}],
    http_auth=(username, password),
    verify_certs=False
)
# Проверка, что соединение установлено
if es.ping():
    print("[ES] Успешное подключение к ElasticSearch!")
else:
    print("[ES] Ошибка подключения к ElasticSearch.")

# Директория для хранения файлов
FILE_DIRECTORY = Path("./files")
FILE_DIRECTORY.mkdir(parents=True, exist_ok=True)

# Индекс в Elasticsearch
INDEX_NAME = "files_index"

prisma = Prisma()

# Модель для преобразования текста в вектор
model = SentenceTransformer('distiluse-base-multilingual-cased-v1')
print('[SentenceTransformer] model loaded:', model)

def create_index():
    # Создание индекса в Elasticsearch
    if not es.indices.exists(index=INDEX_NAME):
        es.indices.create(index=INDEX_NAME, body={
            "mappings": {
                "properties": {
                    "filename": {"type": "text"},
                    "content": {"type": "text"},
                    "content_vector": {"type": "dense_vector", "dims": 512}
                }
            }
        }, ignore=400)  # ignore=400 для игнорирования ошибки, если индекс уже существует


@app.on_event("startup")
async def startup_event():
    create_index()
    await index_files()
    try:
        await prisma.connect()
        print("[DATABASE] Успешное подключение к базе данных!")
    except:
        print("[DATABASE] Ошибка подключения prisma")
        # nothing
        pass


@app.get("/health")
async def health():
    try:
        if prisma and es:
            return {"ok": "true"}
        else:
            raise HTTPException(status_code=400)
    except:
        raise HTTPException(status_code=500)


async def index_files():
    # Функция для индексирования всех файлов в директории
    actions = []
    for file_path in FILE_DIRECTORY.iterdir():
        if file_path.is_file():
            if not is_file_indexed(file_path.name):
                content = extract_content(file_path)
                if content:
                    support_answer_file = get_support_answer_file(file_path.name)
                    content_vector = model.encode(content).tolist()
                    action = {
                        "_index": INDEX_NAME,
                        "_source": {
                            "filename": file_path.name,
                            "content": content,
                            "content_vector": content_vector,
                            "support_answer_file": support_answer_file
                        }
                    }
                    actions.append(action)

    if actions:
        helpers.bulk(es, actions)


def is_file_indexed(filename):
    # Проверка, существует ли уже файл в индексе
    query = {
        "query": {
            "term": {"filename.keyword": filename}
        }
    }
    res = es.search(index=INDEX_NAME, body=query)
    return res['hits']['total']['value'] > 0

def extract_content(file_path: Path) -> str:
    mime = magic.Magic(mime=True)
    mime_type = mime.from_file(str(file_path))

    if file_path =='files\Договор-купли-продажи-шаблон.docx':
        print(mime, mime_type)

    if mime_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return extract_docx_content(file_path)
    elif mime_type == 'application/msword':
        return extract_doc_content(file_path)
    elif mime_type == 'text/plain':
        return extract_txt_content(file_path)
    else:
        return ""


def extract_docx_content(file_path: Path) -> str:
    doc = Document(str(file_path))
    full_text = []
    for paragraph in doc.paragraphs:
        full_text.append(paragraph.text)
    return "\n".join(full_text)


def extract_doc_content(file_path: Path) -> str:
    try:
        # Проверка существования файла
        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")

        word = comtypes.client.CreateObject('Word.Application')
        word.Visible = False

        # Открытие документа
        doc = word.Documents.Open(str(os.getcwd()) + str(file_path))
        content = doc.Content.Text
        doc.Close()
        word.Quit()

        return content
    except Exception as e:
        print(f"Error extracting content from file: {file_path}, Error: {e}")


def extract_txt_content(file_path: Path) -> str:
    with file_path.open("r", encoding="utf-8") as file:
        return file.read()


def get_support_answer_file(filename: str) -> str:
    match = re.match(r'input-(\d+)\.\w+', filename)
    if match:
        index = match.group(1)
        for file_path in FILE_DIRECTORY.iterdir():
            if re.match(rf'output-{index}\.\w+', file_path.name):
                return file_path.name
    return ""


def add_file_to_index(filename: str, filecontent: str):
    support_answer_filename = get_support_answer_file(filename)
    content_vector = model.encode(filecontent).tolist()

    if not is_file_indexed(filename):
        es.index(index=INDEX_NAME, body={
            "filename": filename,
            "content": filecontent,
            "content_vector": content_vector,
            "support_answer_file": support_answer_filename
        })


# Загружает файл в локальную директорию и индексирует его
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_location = FILE_DIRECTORY / file.filename
    try:
        print(f"Uploading file: {file.filename} to {file_location}")
        with file_location.open("wb") as f:
            content = await file.read()
            f.write(content)

        # Индексация файла
        print(f"Extracting content from file: {file_location}")
        file_content = extract_content(file_location)
        if file_content:
            print(f"Adding file to index: {file.filename}")
            add_file_to_index(file.filename, file_content)
        else:
            print(f"No content extracted from file: {file.filename}")

        return {"filename": file.filename}
    except Exception as e:
        print(f"Error uploading file: {file.filename}, Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Скачивает файл из локальной директории
@app.get("/download/{filename}")
async def download_file(filename: str):
    file_location = FILE_DIRECTORY / filename
    if not file_location.exists():
        raise HTTPException(status_code=404, detail="File not found")
    try:
        return StreamingResponse(file_location.open("rb"), media_type='application/octet-stream')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Удаляет файл из локальной директории и из индекса Elasticsearch
@app.delete("/delete/{filename}")
async def delete_file(filename: str):
    file_location = FILE_DIRECTORY / filename
    if not file_location.exists():
        raise HTTPException(status_code=404, detail="File not found")
    try:
        # Удаление файла из локальной директории
        file_location.unlink()

        # Удаление файла из индекса Elasticsearch
        response = es.delete_by_query(index=INDEX_NAME, body={
            "query": {
                "match": {
                    "filename": filename
                }
            }
        })

        # Удаление файла из бд
        document = await prisma.document.delete(
            where={"name": filename},
        )

        return {"detail": "File deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def unique_dicts(dicts):
    seen = set()
    unique_list = []
    for d in dicts:
        # Convert dictionary items to a sorted tuple of (key, value) pairs
        dict_tuple = tuple(sorted((k, tuple(v) if isinstance(v, list) else v) for k, v in d.items()))
        if dict_tuple not in seen:
            seen.add(dict_tuple)
            unique_list.append(d)
    return unique_list



# Поиск файлов по контенту
@app.get("/search/")
async def search_files(query: str = Query(default="", description="Строка для поиска")):
    try:
        query_vector = model.encode(query).tolist()

        # Запрос к ElasticSearch для поиска схожих документов по вектору
        response = es.search(index=INDEX_NAME, body={
            "query": {
                "script_score": {
                    "query": {
                        "match_all": {}
                    },
                    "script": {
                        "source": "cosineSimilarity(params.query_vector, 'content_vector') + 1.0",
                        "params": {"query_vector": query_vector}
                    }
                }
            }
        })
        data = [hit["_source"] for hit in response["hits"]["hits"]]

        # Loop through the initial search results and check for 'support_answer_file'
        for item in data:
            support_answer_file = item.get('support_answer_file')
            if support_answer_file:
                # Additional search request to Elasticsearch based on 'support_answer_file'
                additional_response = es.search(index=INDEX_NAME, body={
                    "query": {
                        "term": {
                            "filename.keyword": support_answer_file
                        }
                    }
                })
                additional_data = [hit["_source"] for hit in additional_response["hits"]["hits"]]
                data.extend(additional_data)

        return unique_dicts(data)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

class SearchPostRequest(BaseModel):
    search_string: str

@app.post("/search/")
async def search_files_post(request: SearchPostRequest):
    print(request)
    search_string = request.search_string
    return await search_files(search_string)

# Список файлов
@app.get("/files/", response_model=List[str])
async def list_files(filterString: str = Query(default="", description="Строка для фильтрации файлов")):
    try:
        files = [f.name for f in FILE_DIRECTORY.iterdir() if f.is_file()]
        if filterString:
            files = [f for f in files if filterString in f]
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/delete_all/")
async def delete_all_files():
    try:
        response = es.delete_by_query(index=INDEX_NAME, body={
            "query": {
                "match_all": {}
            }
        })
        return {"detail": "All documents deleted", "deleted": response['deleted']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8080)

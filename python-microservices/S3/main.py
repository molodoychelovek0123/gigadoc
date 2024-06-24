from fastapi import FastAPI, HTTPException, UploadFile, File, Query
from fastapi.responses import JSONResponse, StreamingResponse
from typing import List
import os
from pathlib import Path
from shutil import copyfileobj
from io import BytesIO


# Инициализация FastAPI
app = FastAPI()

# Директория для хранения файлов
FILE_DIRECTORY = Path("./files")
FILE_DIRECTORY.mkdir(parents=True, exist_ok=True)



def get_unique_filename(directory: Path, filename: str) -> str:
    """Возвращает уникальное имя файла в директории, добавляя нижнее подчеркивание, если файл существует."""
    base_name = Path(filename).stem
    extension = Path(filename).suffix
    counter = 0

    new_filename = filename
    while (directory / new_filename).exists():
        counter += 1
        new_filename = f"{base_name}_{counter}{extension}"

    return new_filename


# Загружает файл в локальную директорию
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    unique_filename = get_unique_filename(FILE_DIRECTORY, file.filename)
    file_location = FILE_DIRECTORY / unique_filename
    try:
        with file_location.open("wb") as f:
            copyfileobj(file.file, f)
        return {"filename": unique_filename}
    except Exception as e:
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


# Удаляет файл из локальной директории
@app.delete("/delete/{filename}")
async def delete_file(filename: str):
    file_location = FILE_DIRECTORY / filename
    if not file_location.exists():
        raise HTTPException(status_code=404, detail="File not found")
    try:
        file_location.unlink()
        return {"detail": "File deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Список файлов в локальной директории
@app.get("/files/", response_model=List[str])
async def list_files(filterString: str = Query(default="", description="Строка для фильтрации файлов")):
    try:
        files = [f.name for f in FILE_DIRECTORY.iterdir() if f.is_file()]
        if filterString:
            files = [f for f in files if filterString in f]
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
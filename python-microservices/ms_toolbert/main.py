from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
# from deeppavlov import configs, train_model, build_model
import numpy as np
import asyncio
from concurrent.futures import ThreadPoolExecutor
from transformers import BertForQuestionAnswering, BertTokenizerFast
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from dataset_generator.constants import QUESTIONS

# model_path = './models/squad_ru_torch_bert'  # Замените на фактический путь
#
# # Инициализация модели с локальным путем
# model = build_model(configs.squad.squad_ru_bert, {'chainer': {'pipe': [{'config_path': model_path}]}})

# Загрузка ранее сохраненной модели и токенизатора
model = BertForQuestionAnswering.from_pretrained('./models/BERT_model')
tokenizer = BertTokenizerFast.from_pretrained('./models/BERT_model')
print("[MODEL] model loaded:", model)

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


# Модель для запроса вопроса
class QuestionRequest(BaseModel):
    context: str
    question: str


# Модель для запроса семантики
class SemanticsRequest(BaseModel):
    context: str
    fields: list
    limit: int | None = None


executor = ThreadPoolExecutor()


def askNeural(context, question):
    max_length = 512

    # Токенизация данных
    inputs = tokenizer(question, context, return_tensors='pt', max_length=max_length, truncation=True)
    # Выполнение предсказаний
    outputs = model(**inputs)

    # Получение стартовых и конечных логитов
    start_logits = outputs.start_logits
    end_logits = outputs.end_logits

    # Определение стартового и конечного индексов ответа
    start_index = np.argmax(start_logits.detach().numpy())
    end_index = np.argmax(end_logits.detach().numpy())

    # Декодирование ответа
    all_tokens = tokenizer.convert_ids_to_tokens(inputs['input_ids'][0])

    # Удаление специальных токенов
    answer = tokenizer.convert_tokens_to_string(all_tokens[start_index:end_index + 1])
    return answer


async def askNeural_async(context, question):
    loop = asyncio.get_event_loop()
    answer = await loop.run_in_executor(executor, askNeural, context, question)
    print("[NEURAL] answer:", answer, "for question:", question)
    return answer


@app.get("/health")
async def health():
    try:
        if model and tokenizer:
            return {"ok": "true"}
        else:
            raise HTTPException(status_code=400)
    except:
        raise HTTPException(status_code=500)


@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        context = request.context
        question = request.question
        answer = await askNeural_async(context, question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def hardcode_search():
    return "10 октября 2022 г."

@app.post("/semantics")
async def extract_semantics(request: SemanticsRequest):
    print("[SEMANTICS] request:", request)
    try:
        fields = request.fields
        context = request.context
        limit = request.limit

        #  список всех задач
        tasks = []
        for field in fields:
            if QUESTIONS.get(field) is None:
                questions = [field]
            else:
                questions = QUESTIONS[field]
            if limit:
                questions = questions[:limit]
            for question in questions:
                tasks.append((field, askNeural_async(context, question)))

        print('async run')
        # Async run
        results = await asyncio.gather(*[task[1] for task in tasks])

        res = []
        field_res = {}
        for (field, result) in zip([task[0] for task in tasks], results):
            if field not in field_res:
                field_res[field] = []
            field_res[field].append(result)

        for field in field_res:
            res.append({field: field_res[field]})

        return {"fields": res}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # return {"fields": [
    #     {
    #         "automobile_model": [
    #             "Mazda 323",
    #             "Mazda",
    #         ]
    #     },
    #     {
    #         "VIN": [
    #             "JTNB11HK1K1234567",
    #             "JTNB11HK1K",
    #         ]
    #     },
    #     {
    #         "sum_rub": [
    #             "1 200 000",
    #             "1 200 000 (Один миллион двести тысяч)",
    #             "1 200 000 (Один миллион двести тысяч) рублей",
    #         ]
    #     }
    # ]}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)

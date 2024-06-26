# Проект: Автоматизация формирования юридических документов

## Описание

Этот проект представляет собой систему автоматизации формирования юридических документов с использованием современных веб-технологий и искусственных нейронных сетей. Проект состоит из нескольких микросервисов, каждый из которых отвечает за определенные функции, что обеспечивает гибкость, масштабируемость и производительность системы.

## Фронтенд

### Стек технологий

- **Next.js**: Фреймворк для React, который позволяет создавать серверно-рендерируемые приложения и статические веб-сайты с отличной производительностью и удобством разработки.

### Функционал

Фронтенд отвечает за взаимодействие с пользователем, предоставляя удобный и интуитивно понятный интерфейс для создания, редактирования и управления юридическими документами.

## Микросервисы

### Общая структура

| Название МС   | Стек технологий                | Описание                                                                                                   |
|---------------|--------------------------------|------------------------------------------------------------------------------------------------------------|
| docxPress     | Express.js                     | Конвертация docx в HTML Nodes. Вынесен из next.js из-за высокой нагрузки на клиентский UI при построении DOM. |
| S3_service    | FastApi                        | Управление файлами (загрузка, скачивание, удаление) в системе.                                             |
| ES_service    | FastApi, ElasticSearch         | Расширяет функционал S3_service, добавляя интеграцию с ElasticSearch для индексирования и быстрого поиска файлов. |
| MS_report     | FastApi, Pandas                | Обработка файлов Excel и генерация отчетов в формате DOCX на основе заданных схем.                         |
| MS_toolBERT   | FastApi, deepPavlov, HF Transformers | Работа с моделью BERT для анализа семантической близости и выдачи четких ответов на основе контекста.         |
| MS_gen        | FastApi, HF Transformers, GigaChat | Интеграция с генеративными ИИ моделями для обработки запросов.                                              |

### Описание микросервисов

1. **docxPress**
    - **Стек технологий**: Express.js
    - **Описание**: Микросервис для конвертации документов формата docx в HTML Nodes. Вынесен из Next.js для снижения нагрузки на клиентский UI при построении Virtual DOM из docx документа.

2. **S3_service**
    - **Стек технологий**: FastApi
    - **Описание**: Управляет файлами, хранящимися в системе. Обеспечивает функции загрузки, скачивания и удаления файлов.

3. **ES_service**
    - **Стек технологий**: FastApi, ElasticSearch
    - **Описание**: Расширяет функционал S3_service, добавляя интеграцию с ElasticSearch для индексирования файлов и выполнения быстрого поиска.

4. **MS_report**
    - **Стек технологий**: FastApi, Pandas
    - **Описание**: Отвечает за обработку файлов Excel и генерацию отчетов в формате DOCX на основе заданных схем.

5. **MS_toolBERT**
    - **Стек технологий**: FastApi, deepPavlov, HF Transformers
    - **Описание**: Работает с моделью BERT для анализа семантической близости и выдачи четких ответов на основе контекста.

6. **MS_gen**
    - **Стек технологий**: FastApi, HF Transformers, GigaChat
    - **Описание**: Интеграция с генеративными ИИ моделями для обработки запросов.

## Установка и запуск

### Требования

- Node.js
- Python 3.8+
- Docker
- Docker Compose

## Планы по дальнейшему развитию

- Добавление статического анализа текста.
- Улучшение точности и надежности генерации текста.
- Интеграция с другими сервисами.
- Разработка мобильной версии редактора.
- Введение функции совместного редактирования документов в реальном времени.
- Внедрение технологии оптического распознавания символов (OCR) для чтения текста из сканированных документов.

## Контакты

Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами по электронной почте: [boxdeveloper@studiobox.dev](mailto:boxdeveloper@studiobox.dev).
import axios from 'axios';

export const fetchGigaChatModels = async (accessToken: string) => {
  try {
    const response = await axios.get(
      'https://gigachat.devices.sberbank.ru/api/v1/models',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка получения моделей GigaChat', error);
  }
};

export const generateText = async (
  accessToken: string,
  userMessage: string,
) => {
  try {
    const response = await axios.post(
      'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      {
        model: 'GigaChat',
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 1.0,
        top_p: 0.1,
        n: 1,
        stream: false,
        max_tokens: 512,
        repetition_penalty: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка генерации текста GigaChat', error);
  }
};

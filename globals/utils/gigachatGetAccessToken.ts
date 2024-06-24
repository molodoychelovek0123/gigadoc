import axios from 'axios';
import { Buffer } from 'buffer';
import { uuid } from 'uuidv4';

const clientId = '27eb2285-813f-4f84-a085-27e48cb5fcc4';
const clientSecret = 'f064c6a3-ea9f-4d65-ae44-92cce89eb836';
const scope = 'GIGACHAT_API_PERS';
const authString = `${clientId}:${clientSecret}`;
const authBase64 = Buffer.from(authString).toString('base64');

export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
      new URLSearchParams({ scope }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: `Basic ${authBase64}`,
          RqUID: uuid(),
        },
      },
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Ошибка получения токена доступа', error);
  }
};

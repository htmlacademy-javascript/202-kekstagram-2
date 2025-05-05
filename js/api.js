const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const getData = () => fetch (`${BASE_URL}${Route.GET_DATA}`)
  .then((response) => response.json());

const sendData = (body) =>
  fetch (
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body: body
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
      }
      return response;
    })
    .catch(() => {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    });

export { getData, sendData };

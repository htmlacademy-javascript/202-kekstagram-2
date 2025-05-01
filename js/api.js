//[ ] Создайте новый модуль и опишите в нём функции взаимодействия c удалённым сервером с помощью fetch для получения и отправки данных. Актуальный адрес сервера вы найдёте в техзадании.
//[✓] Подключите модуль в проект.
//[✓] Доработайте модуль для отрисовки фотографий так, чтобы в качестве данных использовались не случайно сгенерированные объекты, а те данные, которые вы загрузите с удалённого сервера.
//[ ] Добавьте обработку возможных ошибок при загрузке.

const getData = () => fetch ('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json());

const sendData = (body) =>
  fetch (
    'https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body
    },
  )
    .then((response) => response.json());

export { getData, sendData };

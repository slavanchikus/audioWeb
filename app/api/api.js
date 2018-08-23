const host = 'http://localhost:8000';
/* http://localhost:8000 */

export const vkAuth = (login, password) => fetch(`https://blackchat.ru/routes/token/get/simple.php?login=${login}&password=${password}`, {
  method: 'GET',
}).then(response => response)
  .catch((error) => {
    throw error;
  });

export const getUser = token => fetch(`${host}/getuser`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ token }),
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

export const getAudio = (value, page) => fetch(`${host}/getaudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ value, page }),
  credentials: 'include'
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });


export const listenAudio = listenUrl => fetch(`${host}/listenaudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ listenUrl }),
  credentials: 'include'
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });
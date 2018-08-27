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

export const getAudio = (value, page, userId, token) => fetch(`${host}/getaudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ value, page, userId, token }),
  credentials: 'include'
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });


export const listenAudio = url => fetch(`${host}/listenaudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ url }),
  credentials: 'include'
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

export const manageAudio = (audioId, ownerId, userId, token) => fetch(`${host}/manageaudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ audioId, ownerId, userId, token }),
  credentials: 'include'
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

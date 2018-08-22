const host = 'http://localhost:8000';
/* http://localhost:8000 */

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


export const listenAudio = listenUrl => fetch(`${host}/listen`, {
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

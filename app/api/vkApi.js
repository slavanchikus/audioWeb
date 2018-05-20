const host = 'http://localhost:8000';
/* http://localhost:8000 */

export const getUserAudio = userId => fetch(`${host}/getuseraudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ userId }),
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

export const searchAudio = (query, count, offset) => fetch(`${host}/searchaudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query, count, offset }),
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

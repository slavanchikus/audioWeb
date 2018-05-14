const host = 'http://localhost:8000';
/* http://localhost:8000 */

export const getAudio = userId => fetch(`${host}/getuseraudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ userId }),
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

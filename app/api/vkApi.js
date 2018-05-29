const host = 'http://localhost:8000';
/* http://localhost:8000 */

export const getAudio = (value, page) => fetch(`${host}/getaudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ value, page }),
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

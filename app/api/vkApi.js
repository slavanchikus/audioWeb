const host = 'http://localhost:8000';
/* http://localhost:8000 */

export const getAudio = (kind, value, count, offset) => fetch(`${host}/getaudio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ kind, value, count, offset }),
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

export const getUser = () => fetch(`https://login.vk.com/?act=openapi&oauth=1&aid=6285810&location=${window.location.hostname}&new=1`, {
  method: 'GET',
  credentials: 'include',
}).then(response => response.json())
  .catch((error) => {
    throw error;
  });

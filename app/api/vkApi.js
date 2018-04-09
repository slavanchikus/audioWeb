import fetchJsonp from 'fetch-jsonp';

export const getUser = userId => fetchJsonp(`https://api.vk.com/method/users.get?user_ids=${userId}&fields=bdate&v=5.67`)
    .then(response => response.json())
    .catch((error) => {
      throw error;
    });


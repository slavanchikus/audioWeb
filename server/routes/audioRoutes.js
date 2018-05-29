const request = require('request');

module.exports = function(app) {
  app.post('/getaudio', (mainReq, mainRes) => {
    const { value, page } = mainReq.body;
    const url = `http://api-2.datmusic.xyz/search?q=${value}&page=${page}`;
    const params = {
      url,
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
      }
    };
    request(params, (err, res, body) => {
      if (body) {
        const response = JSON.parse(body);
        mainRes.send({ ...response });
      }
    });
  });

  app.get('/test', (mainReq, mainRes) => {
    const url = 'https://api-2.datmusic.xyz/stream/6a214984/1825f556';
    const params = {
      url,
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
      }
    };
    request(params, (err, res, body) => {
      console.log(res);
    });
  });
};


const request = require('request');
const parseBody = require('../utils/parseBody');

module.exports = function(app) {
  app.post('/getaudio', (mainReq, mainRes) => {
    const { value, page, userId, token } = mainReq.body;

    if (userId) {
      let url;
      const offset = (page - 1) * 50;

      if (value !== '') {
        url = `https://api.vk.com/method/audio.search?access_token=${token}&q=${value}&count=50&offset=${offset}&v=5.71`;
      } else {
        url = `https://api.vk.com/method/audio.get?access_token=${token}&owner_id=${userId}&count=50&offset=${offset}&v=5.71`;
      }

      const params = {
        url,
        method: 'GET',
        headers: {
          'user-agent': 'KateMobileAndroid/48.2 lite-433 (Android 7.0; SDK 24; arm64-v8a; samsung SM-G930F; ru)'
        }
      };
      request(params, (err, res, body) => {
        if (body) {
          const response = JSON.parse(body);
          const { items, count } = response.response;
          mainRes.send({ items, hasNextPage: offset < count });
        }
      });
    } else {
      let url;
      if (value !== '') {
        url = `https://music.xn--41a.wiki/search/${value}/`;
        if (page === 1) {
        } else {
          url = `https://music.xn--41a.wiki/search/${value}/${page}/`;
        }
      } else if (page === 1) {
        url = 'https://music.xn--41a.wiki/';
      } else {
        url = `https://music.xn--41a.wiki/page/${page}/`;
      }

      request({ url: encodeURI(url), method: 'GET', }, (err, res, body) => {
        if (body) {
          if (value) {
            const { audios, hasNextPage } = parseBody.parseSearchBidy(body);
            mainRes.send({ items: audios, hasNextPage });
          } else {
            const { audios, hasNextPage } = parseBody.parseTopBody(body);
            mainRes.send({ items: audios, hasNextPage });
          }
        }
      });
    }
  });

  app.post('/listenaudio', (mainReq, mainRes) => {
    request({ url: mainReq.body.url, encoding: null, followRedirect: false }, (err, res) => {
      if (res.caseless) {
        const url = res.caseless.dict.location;
        mainRes.send({ url });
      }
    });
  });

  app.post('/getuser', (mainReq, mainRes) => {
    const { token } = mainReq.body;
    const url = `https://api.vk.com/method/users.get?access_token=${token}&v=5.71`;

    request({ url }, (err, res) => {
      const result = JSON.parse(res.body);
      mainRes.send({ response: result.response[0] });
    });
  });
};

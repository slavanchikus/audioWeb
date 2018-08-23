const request = require('request');
const parseBody = require('../utils/parseBody');

module.exports = function(app) {
  app.post('/getaudio', (mainReq, mainRes) => {
    const { value, page } = mainReq.body;
    let url;
    if (value !== '') {
      if (page === 1) {
        url = `https://music.xn--41a.wiki/search/${value}/`;
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
          const { audios, hasNextPage } = parseBody.parseSearchBody(body);
          mainRes.send({ items: audios, hasNextPage });
        } else {
          const { audios, hasNextPage } = parseBody.parseTopBody(body);
          mainRes.send({ items: audios, hasNextPage });
        }
      }
    });
  });

  app.post('/listenaudio', (mainReq, mainRes) => {
    const { listenUrl } = mainReq.body;

    request({ url: listenUrl, encoding: null, followRedirect: false }, (err, res) => {
      if (res.caseless) {
        const audioUrl = res.caseless.dict.location;
        mainRes.send({ audioUrl });
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

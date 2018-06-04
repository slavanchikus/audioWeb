const request = require('request');
const cheerio = require('cheerio');

module.exports = function(app) {
  app.post('/getaudio', (mainReq, mainRes) => {
    const { value, page } = mainReq.body;
    const url = `http://zaycev.net/search.html?page=${page}&query_search=${value}`;
    const params = {
      url,
      method: 'GET',
    };
    request(params, (err, res, body) => {
      if (body) {
        const $ = cheerio.load(body);
        const response = [];
        $('div[data-rbt-content-id=""]').each((i, el) => {
          const artist = el.children[0].children[1].children[0].children[0];
          const title = el.children[0].children[3].children[0].children[0];
          response.push({
            id: el.attribs['data-dkey'],
            artist: artist ? artist.data : 'Без названия',
            title: title ? title.data : 'Без названия',
            duration: el.attribs['data-duration'],
            url: el.attribs['data-url']
          });
        });
        mainRes.send({ items: response });
      }
    });
  });

  app.post('/listen', (mainReq, mainRes) => {
    const { url } = mainReq.body;
    const reqUrl = `http://zaycev.net${url}`;
    const params = {
      url: reqUrl,
      method: 'GET',
    };
    request(params, (err, res, body) => {
      if (body) {
        const resUrl = JSON.parse(body);
        mainRes.send({ ...resUrl });
      }
    });
  });
};

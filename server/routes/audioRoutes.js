const request = require('request');
const cheerio = require('cheerio');

module.exports = function(app) {
  app.post('/getaudio', (mainReq, mainRes) => {
    const { value, page } = mainReq.body;
    const url = `http://mp3-cc.com/search/f/${value}/page/${page}/`;
    const params = {
      url,
      method: 'GET',
    };
    request(params, (err, res, body) => {
      if (body) {
        const $ = cheerio.load(body);
        const response = [];
        $('.playlist-name').each((i, el) => {
          const artist = el.children[1].children[0].children[0];
          const title = el.children[5].children[0].children[0];
          response.push({
            id: el.parent.attribs['data-id'],
            artist: artist ? artist.data : 'Без названия',
            title: title ? title.data : 'Без названия',
            duration: (el.parent.attribs['data-duration'] / 1000) + 1,
            url: el.parent.attribs['data-mp3']
          });
        });
        mainRes.send({ items: response });
      }
    });
  });
};

const request = require('request');
const cheerio = require('cheerio');

function parseBody(body) {
  const $ = cheerio.load(body);

  const hasNextPage = !!$('ul.listalka').attr('data-next-page');

  const audios = [];
  $('li.track').each((i, el) => {
    const artist = el.children[5].children[0].children[0].data;
    const title = el.children[5].children[2].children[0].data;
    const img = el.children[2].children[1].attribs.src;
    audios.push({
      id: el.attribs['data-id'],
      artist: artist || 'Без названия',
      title: title || 'Без названия',
      duration: el.attribs['data-duration'] / 1000,
      url: `https://mp3-vc.ru${el.attribs['data-mp3']}`,
      img
    });
  });
  return {
    audios,
    hasNextPage
  };
}

module.exports = function(app) {
  app.post('/getaudio', (mainReq, mainRes) => {
    const { value, page } = mainReq.body;
    let url;
    if (page === 1) {
      url = `https://mp3-vc.ru/search/${value}/`;
    } else {
      url = `https://mp3-vc.ru/search/${value}/${page}/`;
    }
    request({ url: encodeURI(url), method: 'GET' }, (err, res, body) => {
      if (body) {
        const { audios, hasNextPage } = parseBody(body);
        mainRes.send({ items: audios, hasNextPage });
      }
    });
  });
};

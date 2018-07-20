const request = require('request');
const cheerio = require('cheerio');

function parseSearchBody(body) {
  const $ = cheerio.load(body);

  const hasNextPage = !!$('ul.listalka').attr('data-next-page');

  const audios = [];
  $('li.track').each((i, el) => {
    const artist = el.children[7].children[1].children[0].data;
    const title = el.children[7].children[3].children[0].data;
    const img = el.children[3].children[1].attribs.src;
    audios.push({
      id: el.attribs['data-id'],
      artist: artist || 'Без названия',
      title: title || 'Без названия',
      duration: el.attribs['data-duration'] / 1000,
      url: `https://music.xn--41a.wiki${el.attribs['data-mp3']}`,
      img,
      imgCors: false
    });
  });
  return {
    audios,
    hasNextPage
  };
}

function parseTopBody(body) {
  const $ = cheerio.load(body);
  const audios = [];
  $('li.track').each((i, el) => {
    const artist = el.children[7].children[1].children[0].children[0].data;
    const title = el.children[7].children[3].children[0].children[0].data;
    const img = el.children[3].children[1].attribs.src;
    audios.push({
      id: el.attribs['data-id'],
      artist: artist || 'Без названия',
      title: title || 'Без названия',
      duration: el.attribs['data-duration'] / 1000,
      url: `https://music.xn--41a.wiki${el.attribs['data-mp3']}`,
      img,
      imgCors: true
    });
  });
  return {
    audios,
    hasNextPage: true
  };
}

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
          const { audios, hasNextPage } = parseSearchBody(body);
          mainRes.send({ items: audios, hasNextPage });
        } else {
          const { audios, hasNextPage } = parseTopBody(body);
          mainRes.send({ items: audios, hasNextPage });
        }
      }
    });
  });

  app.post('/listen', (mainReq, mainRes) => {
    const { url } = mainReq.body;
    request({ url, encoding: null, followRedirect: false }, (err, res) => {
      if (res.caseless) {
        const audioUrl = res.caseless.dict.location;
        mainRes.send({ url: audioUrl });
      }
    });
  });
};

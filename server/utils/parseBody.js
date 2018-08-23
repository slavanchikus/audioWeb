const cheerio = require('cheerio');

module.exports.parseSearchBidy = function parseSearchBody(body) {
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
      listenUrl: `https://music.xn--41a.wiki${el.attribs['data-mp3']}`,
      img,
      imgCors: false
    });
  });
  return {
    audios,
    hasNextPage
  };
};

module.exports.parseTopBody = function parseTopBody(body) {
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
      listenUrl: `https://music.xn--41a.wiki${el.attribs['data-mp3']}`,
      img,
      imgCors: true
    });
  });
  return {
    audios,
    hasNextPage: true
  };
};

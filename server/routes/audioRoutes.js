const request = require('request');
const cheerio = require('cheerio');

function parseBody(body) {
  const $ = cheerio.load(body);
  const audios = [];
  $('div[data-rbt-content-id=""]').each((i, el) => {
    const artist = el.children[0].children[1].children[0].children[0];
    const title = el.children[0].children[3].children[0].children[0];
    audios.push({
      id: el.attribs['data-dkey'],
      artist: artist ? artist.data : 'Без названия',
      title: title ? title.data : 'Без названия',
      duration: el.attribs['data-duration'],
      url: el.attribs['data-url'],
    });
  });
  return audios;
}

module.exports = function(app) {
  app.post('/getaudio', (mainReq, mainRes) => {
    const { value, page } = mainReq.body;
    let url;
    if (value) {
      url = `http://zaycev.net/search.html?page=${page}&query_search=${value}`;
    } else {
      url = `http://zaycev.net/top/more.html?page=${page}`;
    }
    request({ url: encodeURI(url), method: 'GET' }, (err, res, body) => {
      if (body) {
        const audios = parseBody(body);
        const currTime = Math.round(+new Date() / 1000);
        const restriction = audios.reduce((sum, currentItem) => {
          sum[`streaming_${currentItem.id}`] = {
            activity: 'streaming',
            dKey: { value: currentItem.id },
            geo: [['ru', 'spe']],
            timestamp: currTime
          };
          return sum;
        }, {});
        request({
          url: 'http://filezmeta.zaycev.net/v2/checkRestriction',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ list: restriction }),
        }, (subErr, subRes, subBody) => {
          const audiosChecked = JSON.parse(subBody);
          const response = [];
          Object.keys(audiosChecked.res).forEach((item) => {
            const audioId = item.slice(10);
            if (audiosChecked.res[item] !== false) {
              const index = audios.findIndex(i => i.id === audioId);
              response.push(audios[index]);
            }
          });
          mainRes.send({ items: response });
        });
      }
    });
  });

  app.post('/listen', (mainReq, mainRes) => {
    const { url } = mainReq.body;
    const reqUrl = `http://zaycev.net${url}`;
    request({ url: reqUrl, method: 'GET' }, (err, res, body) => {
      if (body) {
        const resUrl = JSON.parse(body);
        mainRes.send({ ...resUrl });
      }
    });
  });
};

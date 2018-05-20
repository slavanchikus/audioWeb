const request = require('request');

const to = '9927d106a14db7e460a57ab29bad70ce2deea4f7da2e470d7273c7096a199dc53e038fb73b366ff8e3753';

module.exports = function(app) {
  app.post('/getuseraudio', (mainReq, mainRes) => {
    const url = `https://api.vk.com/method/audio.get?access_token=${to}&owner_id=${mainReq.body.userId}&v=5.71`;
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
        mainRes.send({ ...response });
      }
    });
  });
  app.post('/searchaudio', (mainReq, mainRes) => {
    const { query, count, offset } = mainReq.body;
    const url = `https://api.vk.com/method/audio.search?access_token=${to}&q=${query}&count=${count}&offset=${offset}&v=5.71`;
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
        mainRes.send({ ...response });
      }
    });
  });
};


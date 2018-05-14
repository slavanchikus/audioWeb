const request = require('request');

module.exports = function(app) {
  app.post('/getuser', (mainReq, mainRes) => {
    const url = 'https://api.vk.com/method/audio.get?access_token=9927d106a14db7e460a57ab29bad70ce2deea4f7da2e470d7273c7096a199dc53e038fb73b366ff8e3753&owner_id=9387646&v=5.71';
    const params = {
      url,
      method: 'GET',
      headers: {
        'user-agent': 'KateMobileAndroid/48.2 lite-433 (Android 7.0; SDK 24; arm64-v8a; samsung SM-G930F; ru)'
      }
    };
    request(params, (err, res, body) => {
      if (body) {
        mainRes.send({ res: body });
      }
    });
  });
};


const request = require('request');

const j = request.jar();

module.exports = function(app) {
  app.post('/getuser', (mainReq, mainRes) => {
    const userId = mainReq.body.userId;
    const url = `https://api.vk.com/method/users.get?user_ids=${userId}&fields=bdate&v=5.67&callback=json`;
    const params = {
      url,
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
      },
      jar: j
    };
    request(params, (err, res, body) => {
      const cookieString = j.getCookieString(url);
      const cookies = j.getCookies(url);
      console.log(cookieString);
      console.log(cookies);
      if (body) {
        mainRes.send({ res: body });
      }
    });
  });
};

const https = require('https');

const coolCookue = 'remixlang=0; remixstid=94762466_82231675fbc5b0cacf; remixflash=0.0.0; remixscreen_depth=24; remixdt=0; remixmdevice=1920/1200/1/!!-!!!!; remixgp=0a43b349c2a6b49ad35fd6f0d76db23a; remixseenads=2; remixsid=e79beb7e417f0e05c7e18f328c9bdf33512d985d62e8754af9f5b; remixrefkey=d1fb7610a21ed037de; remixcurr_audio=9387646_456239111';

module.exports = function(app) {
  app.post('/getaudio', (mainReq, mainRes) => {
    const params = mainReq.body.params;
    const postData = mainReq.body.postData;
    const req = https.request(params, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        mainRes.send({ res: 'errorStatus' });
      }
      let body = [];
      res.on('data', (chunk) => {
        body.push(chunk);
      });
      res.on('end', () => {
        try {
          body = Buffer.concat(body);
        } catch (e) {
          mainRes.send({ e });
        }
        mainRes.send({ res: body });
      });
    });
    req.on('error', (err) => {
      mainRes.send({ err });
    });
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};

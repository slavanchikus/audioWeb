const querystring = require('querystring');
const iconv = require('iconv-lite');

const COOKIE = 'remixstid=1330496561_c4ca4b78c2e70b44c7; remixscreen_depth=24; remixdt=0; remixlang=0; remixsid=3d28ec2f00927ba7aa0b2b3ceb1ed8038b3752d91d22b51dcb4b7; remixflash=0.0.0; remixab=1; remixgp=3790c6a6542e3d1890dee3823bb2fe93; remixrefkey=38cae64dd31505dcdf; remixseenads=1; remixcurr_audio=9387646_456239106; remixsts=%7B%22data%22%3A%5B%5B1523006104%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A7001%2C%22last%22%3A1523006099781%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006115%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A7996%2C%22last%22%3A1523006111780%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006127%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A10999%2C%22last%22%3A1523006126780%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006141%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A7001%2C%22last%22%3A1523006136782%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006152%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A7998%2C%22last%22%3A1523006148780%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006164%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A8000%2C%22last%22%3A1523006160781%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006176%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A7999%2C%22last%22%3A1523006172780%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006187%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A7998%2C%22last%22%3A1523006183780%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006199%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A7001%2C%22last%22%3A1523006194781%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006210%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A7998%2C%22last%22%3A1523006206780%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006222%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A11000%2C%22last%22%3A1523006221781%2C%22options%22%3A%7B%7D%7D%7D%5D%2C%5B1523006237%2C%22time_spent%22%2C%7B%22audio%22%3A%7B%22full%22%3A8001%2C%22last%22%3A1523006233781%2C%22options%22%3A%7B%7D%7D%7D%5D%5D%2C%22uniqueId%22%3A983446757%7D';
const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';

export const getAudio = (userId) => {
  function httpsRequest(params, postData) {
    return new Promise((resolve, reject) => fetch('http://localhost:8000/getaudio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ params, postData }),
    })
      .then(response => resolve(response.json()))
      .catch((error) => {
        throw error;
      }));
  }

  const r = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=';
  const l = {
    v(t) {
      return t.split('').reverse().join('');
    },
    r(t, e) {
      t = t.split('');
      for (let i, o = r + r, a = t.length; a--;) { i = o.indexOf(t[a]), ~i && (t[a] = o.substr(i - e, 1)); }
      return t.join('');
    },
    s(t, e) {
      const i = t.length;
      if (i) {
        let o = s(t, e),
          a = 0;
        for (t = t.split(''); ++a < i;) { t[a] = t.splice(o[i - 1 - a], 1, t[a])[0]; }
        t = t.join('');
      }
      return t;
    },
    i(t, e) {
      return l.s(t, e ^ userId);
    },
    x(t, e) {
      const i = [];
      return e = e.charCodeAt(0),
        each(t.split(''), (t, o) => {
          i.push(String.fromCharCode(o.charCodeAt(0) ^ e));
        }),
        i.join('');
    }
  };

  function getRealLink(t) {
    if (~t.indexOf('audio_api_unavailable')) {
      let e = t.split('?extra=')[1].split('#'),
        o = e[1] === '' ? '' : a(e[1]);
      if (e = a(e[0]),
        typeof o !== 'string' || !e) { return t; }
      o = o ? o.split(String.fromCharCode(9)) : [];
      for (var s, r, n = o.length; n--;) {
        if (r = o[n].split(String.fromCharCode(11)),
            s = r.splice(0, 1, e)[0], !l[s]) { return t; }
        e = l[s].apply(null, r);
      }
      if (e && e.substr(0, 4) === 'http') { return e; }
    }
    return t;
  }

  function a(t) {
    if (!t || t.length % 4 == 1) { return !1; }
    for (var e, i, o = 0, a = 0, s = ''; i = t.charAt(a++);) {
      i = r.indexOf(i), ~i && (e = o % 4 ? 64 * e + i : i,
      o++ % 4) && (s += String.fromCharCode(255 & e >> (-2 * o & 6)));
    }
    return s;
  }

  function s(t, e) {
    let i = t.length,
      o = [];
    if (i) {
      let a = i;
      for (e = Math.abs(e); a--;) {
        e = (i * (a + 1) ^ e + a) % i,
          o[a] = e;
      }
    }
    return o;
  }

  async function audioApi(payload, callback) {
    // Build the post string from an object

    const postData = querystring.stringify(
      payload
    );

    const postOptions = {
      host: 'vk.com',
      scheme: 'https',
      port: '443',
      path: '/al_audio.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        Cookie: COOKIE,
        'user-agent': USER_AGENT
      }
    };
    const result = await httpsRequest(postOptions, postData);
    return result.res.data;
  }

  function parseJSONList(x) {
    return {
      track_id: x[0],
      user_id: x[1],
      src: x[2],
      title: x[3],
      author: x[4]
    };
  }

  function prepare(data) {
    const res = iconv.decode(data, 'win1251');
    let jsonData = res.split('<!>')[5];
    jsonData = JSON.parse(jsonData.slice(7));
    return jsonData;
  }

  async function getSources(playlist) {
    console.log('getting sources');

    const pd = {
      act: 'reload_audio',
      al: '1',
      ids: ''
    };

    let res;

    const ids = [];
    playlist.forEach((val, index, arr) => {
      if (!val.src) { ids.push(`${val.user_id}_${val.track_id}`); }
    });

    playlist = playlist.filter((x) => {
      if (x.src) { return true; }

      return false;
    });
    console.log(ids);
    for (let i = 0; i * 9 < ids.length; i++) {
      console.log(`\n ON ITERATION ${i}. from ${9 * i} to ${9 * (i + 1)} \n`);
      pd.ids = ids.slice(9 * i, 9 * (i + 1))
        .join();
      try {
        res = await audioApi(pd);
      } catch (e) {
        console.log(e);
      }
      res = prepare(res)
        .map(parseJSONList);
      console.log(res.length);
      playlist = playlist.concat(res);
    }
    console.log(playlist.length);
    console.log(getRealLink(playlist[0].src));
  }


  const buildPlaylist = async () => {
    let playlist = [];
    const pd = {
      al: 1,
      act: 'load_section',
      owner_id: userId,
      type: 'playlist',
      playlist_id: '-1',
      offset: 0
    };
    /* const pd = {
     al: 1,
     claim: 0,
     act: 'load_section',
     owner_id: userId,
     type: 'search',
     search_history: '0',
     search_q: 'rhcp cant stop',
     offset: 0
     }; */
    let res = await audioApi(pd);
    res = prepare(res);
    let list = res.list.map(x => ({
      track_id: x[0],
      user_id: x[1],
      src: x[2],
      title: x[3],
      author: x[4]
    }));
    playlist = list;

    while (res.hasMore != 0) {
      pd.offset = res.nextOffset;
      res = await audioApi(pd);
      res = prepare(res);
      list = res.list.map(parseJSONList);
      playlist = playlist.concat(list);
    }
    console.log(playlist);
    console.log(playlist.length);
    getSources(playlist);
  };

  return buildPlaylist();
};

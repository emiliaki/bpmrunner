const request = require('request');
const queryString = require('query-string');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req, res) => {
  const scope = 'playlist-read-private playlist-read-collaborative';
  res.redirect('https://accounts.spotify.com/authorize?' + 
    queryString.stringify({
      response_type: 'code',
      client_id: '0f56240f9ac94051b3dee03b53c36fbe',
      scope: scope,
      redirect_uri: 'http://localhost:5000/callback'
    }));
});

app.get('/callback', (req, res) => {
  const {code} = req.query;
  const postOptions = { 
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: 'http://localhost:5000/callback',
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': `Basic ${(new Buffer('0f56240f9ac94051b3dee03b53c36fbe' + ':' + '9c93269b5f4b4ae5b643516210dd2537').toString('base64'))}`
    },
    json: true
  };
    
  request.post(
    postOptions,
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const { access_token, refresh_token } = body;

        const getUserOptions = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': `Bearer ${access_token}` },
          json: true
        };

        request.get(getUserOptions, (error, response, body) => {
          const { id } = body;
          
          res.redirect('/?' +
            queryString.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
              user_id: id
            }));
        });
      }
    }
  );
});

app.get('/refresh_token', function(req, res) {
  const { refresh_token } = req.query;
  
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'Authorization': `Basic ${(new Buffer('0f56240f9ac94051b3dee03b53c36fbe' + ':' + '9c93269b5f4b4ae5b643516210dd2537').toString('base64'))}` 
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token } = body;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('/playlists', (req, res) => {
  const { access_token, user_id} = req.query;
  
  const getPlaylistOptions = {
    url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
    headers: { 'Authorization': `Bearer ${access_token}` },
    json: true
  }
  
  const getUser = {
    url: `https://api.spotify.com/v1/me`,
    headers: { 'Authorization': `Bearer ${access_token}` },
    json: true
  }
  
  request.get(getPlaylistOptions, (error, response, body) => {
    const playlists = body;
    
    request.get(getUser, (error, response, body) => {
      const user = body;
      
      res.send({ playlists, user });
    });  
  });
});

app.get('/tracks', (req, res) => {
  const { access_token, user_id, playlist_id} = req.query;
  
  const getPlaylistOptions = {
    url: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
    headers: { 'Authorization': `Bearer ${access_token}` },
    json: true
  }
  
  request.get(getPlaylistOptions, (error, response, body) => {
    res.send(body)
  });
});



var listener = app.listen('5000', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

(function () {
  const loginButton = document.querySelector('.login');

  const searchParams = new URLSearchParams(window.location.search)

  const access_token = searchParams.get('access_token');
  const user_id = searchParams.get('user_id');

  //############### TRACKS WITH CORRECT BPM #################################################
  function renderBPMTracks(container, items, tempo) {

    this.getTracks = function () {
      return fetch(`https://api.spotify.com/v1/tracks/${items.id}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }).then(response => response.json())
        .then(data => data)
    }


    this.getTracks().then(track => {
      container.innerHTML = `
      <h3><a href="${track.external_urls.spotify}" target="_blank" rel="noopener noreferrer">${track.name}</a></h3>
      <h4>${track.album.name}</h4>
      <p>by ${track.artists.map(a => a.name).join(', ')}</p>
      <p>BPM: ${tempo}</p>`
        ;
    })
    return container
  }
  //#################### TRACKS ####################################################################

  function renderTracks(container, items, tempo) {

    const tracksFragment = document.createDocumentFragment();

    const tracks = items.map((item, index) => {

      const { track } = item;
      const { album, artists } = track;

      const trackElement = document.createElement('div');

      trackElement.classList.add('track');

      if (index === items.length - 1) trackElement.classList.add('last');

      this.getTrackFeatures = function () {
        return fetch(`https://api.spotify.com/v1/audio-features/${track.id}`, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }).then(response => response.json())
          .then(data => data)
      }

      if (tempo === 'low') {
        this.getTrackFeatures().then(trackInfo => {
          if (trackInfo.tempo <= 100) {
            renderBPMTracks(trackElement, trackInfo, trackInfo.tempo)
          }
        })
        return trackElement;
      } else if (tempo === 'medium') {
        this.getTrackFeatures().then(trackInfo => {
          console.log(trackInfo.tempo)
          if (trackInfo.tempo > 100 && trackInfo.tempo < 170) {
            renderBPMTracks(trackElement, trackInfo, trackInfo.tempo)
          }
        })
        return trackElement;
      } else if (tempo === 'high') {
        this.getTrackFeatures().then(trackInfo => {
          if (trackInfo.tempo >= 170) {
            renderBPMTracks(trackElement, trackInfo, trackInfo.tempo)
          }
        })
        return trackElement;
      }

    });

    tracks.forEach(track => tracksFragment.appendChild(track));

    container.after(tracksFragment);
  }

  //########################## PLAYLISTS ######################################################################  

  function renderPlaylists(container, items, tempo) {

    container.innerHTML = '';
    const playlistsFragment = document.createDocumentFragment();
    const playlistSelect = document.createElement('select');
    playlistSelect.setAttribute('value', "")

    const playlists = items.map(item => {

      const playlistFragment = document.createDocumentFragment();


      const playlistOption = document.createElement('option')
      playlistOption.setAttribute('value', item.id)
      playlistOption.innerHTML = item.name;
      playlistSelect.appendChild(playlistOption)
      playlistFragment.appendChild(playlistSelect);

      return playlistFragment;
    });

    const tracks = document.createElement('div');

    playlistSelect.addEventListener('change',
      function (event) {

        fetch(`/tracks?access_token=${access_token}&user_id=${user_id}&playlist_id=${event.target.value}`)
          .then(res => res.json())
          .then(({ items }) => {
            renderTracks(tracks, items, tempo);
          });
      })

    playlists.forEach(playlist => playlistsFragment.appendChild(playlist));

    container.appendChild(playlistsFragment);
    container.appendChild(tracks)
  }

  //######################### RETURNED TO HTML FILE ########################################################################  

  if (access_token) {
    loginButton.disabled = true;

    const tabs = document.querySelector('.tabs')
    tabs.setAttribute('style', 'display')

    var button = document.createElement('button')
    button.setAttribute('id', 'goButton')
    button.innerHTML = 'Go!'

    document.addEventListener("init", function (event) {

      const playlists = document.querySelector('.playlists');
      const actions = document.querySelector('.actions');
      playlists.innerHTML = 'Loading...'

      if (event.target.id === "low") {
        fetch(`/playlists?access_token=${access_token}&user_id=${user_id}`)
          .then(res => res.json())
          .then(({ playlists: { items }, user }) => {
            const heading = document.createElement('h1');
            heading.innerHTML = `Logged in as <span>${user.display_name}</span>`;
            actions.appendChild(heading);
            renderPlaylists(playlists, items.filter(item => item.owner.id === user_id), event.target.id)
            playlists.appendChild(button)
          });
      } else if (event.target.id === 'medium') {

        fetch(`/playlists?access_token=${access_token}&user_id=${user_id}`)
          .then(res => res.json())
          .then(({ playlists: { items }, user }) => {
            const heading = document.createElement('h1');
            heading.innerHTML = `Logged in as <span>${user.display_name}</span>`;
            actions.appendChild(heading);
            renderPlaylists(playlists, items.filter(item => item.owner.id === user_id), event.target.id)
          });
      } else if (event.target.id === 'high') {
        fetch(`/playlists?access_token=${access_token}&user_id=${user_id}`)
          .then(res => res.json())
          .then(({ playlists: { items }, user }) => {
            const heading = document.createElement('h1');
            heading.innerHTML = `Logged in as <span>${user.display_name}</span>`;
            actions.appendChild(heading);
            renderPlaylists(playlists, items.filter(item => item.owner.id === user_id), event.target.id)
          });
      } else if (event.target.id === 'intervals') {
        fetch(`/playlists?access_token=${access_token}&user_id=${user_id}`)
          .then(res => res.json())
          .then(({ playlists: { items }, user }) => {
            const heading = document.createElement('h1');
            heading.innerHTML = `Logged in as <span>${user.display_name}</span>`;
            actions.appendChild(heading);
            renderPlaylists(playlists, items.filter(item => item.owner.id === user_id), event.target.id)
          });
      }

      button.addEventListener('click', function(){
        playlists.setAttribute("style", "display: none")
        const player = document.querySelector('.player')
        console.log(player)
      })

    });

  }
})()
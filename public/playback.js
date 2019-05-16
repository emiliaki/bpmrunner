(function () {

const button = document.getElementById("low.html")
const player = document.querySelector('.player')

console.log(goButton)

const searchParams = new URLSearchParams(window.location.search)

const access_token = searchParams.get('access_token');

button.addEventListener('click', function(){
    playlists.setAttribute("style", "display: none")
    const player = document.querySelector('.player')
    console.log(player)
  })

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = access_token;
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
  
    // Playback status updates
  
    const track = document.getElementById('track')
    const name = document.createElement('h2')
    const image = document.createElement('img')
    player.addListener('player_state_changed', state => {
      name.innerHTML = state.track_window.current_track.name
      image.setAttribute('src', state.track_window.current_track.album.images[0].url)
    });
    track.appendChild(name)
    track.appendChild(image)
  
    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });
  
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
   
    //Play-button
  
    const play = document.getElementById('play');
    var playButton = document.createElement('button')
    playButton.innerHTML = '<i class="fa fa-play"></i>';
    play.appendChild(playButton)
    playButton.addEventListener('click', 
    function(){
      player.resume().then(() => {
        console.log('Resumed!');
      });
    })
  
    //Pause-button
    const pause = document.getElementById('pause');
    var pauseButton = document.createElement('button')
    pauseButton.innerHTML = '<i class="fa fa-pause"></i>';
    pause.appendChild(pauseButton)
    pauseButton.addEventListener('click', 
    function(){
      player.pause().then(() => {
        console.log('Resumed!');
      });
    })
  
    // Connect to the player!
    player.connect();
  
  };

})()
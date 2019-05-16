document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'page1') {
    console.log('hej')
    page.querySelector('#aboutus').onclick = function() {
      document.querySelector('#myNavigator').pushPage('about.html', {data: {title: 'About us'}});
    };
    page.querySelector('#rules').onclick = function() {
      document.querySelector('#myNavigator').pushPage('rules.html', {data: {title: 'Rulebook'}});
    };
    page.querySelector('#friends').onclick = function() {
      document.querySelector('#myNavigator').pushPage('friends.html', {data: {title: 'Friends'}});
    };
    page.querySelector('#settings').onclick = function() {
      document.querySelector('#myNavigator').pushPage('settings.html', {data: {title: 'Settings'}});
    };
    page.querySelector('#new_game').onclick = function() {
      document.querySelector('#myNavigator').pushPage('new_game.html', {data: {title: 'New Game'}});
    };
    page.querySelector('#characters').onclick = function() {
      document.querySelector('#myNavigator').pushPage('characters.html', {data: {title: 'Characters'}});
    };
  } 
  else if (page.id === 'about') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
  else if (page.id === 'rulebook') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
  else if (page.id === 'friends') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
  else if (page.id === 'settings') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
  else if (page.id === 'new_game') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
  else if (page.id === 'characters') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }


});
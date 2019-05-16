document.addEventListener('init', function(event) {
    var page = event.target;
  
    if (page.id === 'page1') {
      page.querySelector('#aboutus').onclick = function() {
        document.querySelector('#myNavigator').pushPage('about.html', {data: {title: 'About us'}});
      };
      page.querySelector('#Low').onclick = function() {
        document.querySelector('#myNavigator').pushPage('low.html', {data: {title: 'Low pace workout'}});
      };
      page.querySelector('#Medium').onclick = function() {
        document.querySelector('#myNavigator').pushPage('medium.html', {data: {title: 'Medium pace workout'}});
      };
      page.querySelector('#High').onclick = function() {
        document.querySelector('#myNavigator').pushPage('high.html', {data: {title: 'High pace workout'}});
      };
      page.querySelector('#Intervals').onclick = function() {
        document.querySelector('#myNavigator').pushPage('intervals.html', {data: {title: 'Intervals'}});
      };
    } 
    else if (page.id === 'about') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
    else if (page.id === 'low') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
    else if (page.id === 'medium') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
    else if (page.id === 'high') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
    else if (page.id === 'intervals') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
  
  });
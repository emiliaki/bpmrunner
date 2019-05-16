var platform = new H.service.Platform({
  app_id: 'Ed7DoMXkJPqxLYxv621K', // // <-- ENTER YOUR APP ID HERE
  app_code: 'GjuEdWeyBu4HP1FoIa89pQ​', // <-- ENTER YOUR APP CODE HERE
});

var defaultLayers = platform.createDefaultLayers();
var mapContainer = document.getElementById('map-container');

var map = new H.Map(
  mapContainer,
  defaultLayers.normal.map);


window.addEventListener('resize', function () {
  map.getViewPort().resize();
});
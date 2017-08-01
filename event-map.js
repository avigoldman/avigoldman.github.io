var map, markers = {};
var locations = {
  sfhtml5:     { lat: 37.7900517, lng: -122.3923731 }, // 345 Spear Street, San Francisco, CA, 94105, us
  rit:         { lat: 43.0847046, lng: -77.6772667  }, // 1 Lomb Memorial Dr, Rochester, NY 14623
  angelhackSV: { lat: 37.5635335, lng: -122.3271869 }, // 44 E 3rd Ave, San Mateo, CA 94401, USA
};

var events = document.getElementsByClassName("event");

function zoomToMarker() {
  var eventKey = this.getAttribute('data-event');

  if (markers.hasOwnProperty(eventKey)) {
    var eventMarker = markers[eventKey];

    map.setZoom(14);
    map.panTo(eventMarker.position);
  }
};


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {});

  var bounds = new google.maps.LatLngBounds();
  
  // add markers
  for (var key in locations) {
    markers[key] = new google.maps.Marker({
      position: locations[key],
      map: map
    });

   bounds.extend(markers[key].getPosition());
  }
  
  // fit map to markers
  map.fitBounds(bounds);
  
  // attached listeners
  for (var i = 0; i < events.length; i++) {
    events[i].addEventListener('mouseover', zoomToMarker, false);
    events[i].addEventListener('focus', zoomToMarker, false);
  }
}
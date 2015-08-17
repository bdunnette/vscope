/*****************************************************************************/
/* Slide: Event Handlers */
/*****************************************************************************/
Template.Slide.events({});

/*****************************************************************************/
/* Slide: Helpers */
/*****************************************************************************/
Template.Slide.helpers({

});

/*****************************************************************************/
/* Slide: Lifecycle Hooks */
/*****************************************************************************/
Template.Slide.created = function() {};

Template.Slide.rendered = function() {
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images';

  $('#map').css({
    height: $(window).innerHeight() + 'px'
  });

  var map = L.map('map').setView([0, 0], 3);

  var slideTiles = L.tileLayer('/images/blank.png', {
    id: 'slideTiles',
    attribution: 'Images &copy; Regents of the University of Minnesota',
    maxZoom: 8
  });

  slideTiles.addTo(map);

  var slideQuery = Slides.find({
    _id: Router.current().params._id
  });

  slideQuery.observe({
    added: function(document) {
      slideTiles.setUrl(document.slideUrl + '/{z}/{y}/{x}.jpg');
    }
  });

  var drawnItems = L.featureGroup().addTo(map);

  if (Meteor.userId()) {
    map.addControl(new L.Control.Draw({
      draw: {
        polyline: false,
        polygon: false,
        rectangle: false
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: true
      }
    }));
  }

  map.on('draw:created', function(event) {
    var layer = event.layer;
    var feature = {
      options: event.layer.options,
      layerType: event.layerType,
      slide: Router.current().params._id,
      user: Meteor.userId()
    };
    switch (event.layerType) {
      case 'marker':
        feature.latlng = event.layer._latlng;
        break;
      case 'circle':
        feature.latlng = event.layer._latlng;
        feature.radius = event.layer._mRadius;
        break;
    }
    Markers.insert(feature);
  });


  map.on('draw:deleted', function(event) {
    for (var l in event.layers._layers) {
      Markers.remove({
        _id: l
      });
    }
  });

  var markerQuery = Markers.find({
    slide: Router.current().params._id
  });

  markerQuery.observe({
    added: function(document) {
      switch (document.layerType) {
        case 'marker':
          var feature = L.marker(document.latlng);
          break;
        case 'circle':
          var feature = L.circle(document.latlng, document.radius);
          break;
      }
      feature._leaflet_id = document._id;
      feature.addTo(drawnItems);
    },
    removed: function(oldDocument) {
      layers = map._layers;
      var key, val;
      for (key in layers) {
        val = layers[key];
        if (val._latlng) {
          if (val._latlng.lat === oldDocument.latlng.lat && val._latlng
            .lng === oldDocument.latlng.lng) {
            map.removeLayer(val);
          }
        }
      }
    }
  });

  $(window).resize(function() {
    $('#map').css({
      height: $(window).innerHeight() + 'px'
    });
  });
};

Template.Slide.destroyed = function() {};

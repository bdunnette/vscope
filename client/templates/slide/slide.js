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

  var map = L.map('map').setView([0,0], 3);
  var slideTiles = L.tileLayer('/images/blank.png', {id: 'slideTiles', attribution: 'Images &copy; Regents of the University of Minnesota', maxZoom: 8});
  slideTiles.addTo(map);
  
  var slideQuery = Slides.find({_id: Router.current().params._id});
  slideQuery.observe({
    added: function (document) {
      slideTiles.setUrl(document.slideUrl + '/{z}/{y}/{x}.jpg');
    }
  });
  
  var drawnItems = L.featureGroup().addTo(map);
  console.log(drawnItems);
  
    map.addControl(new L.Control.Draw({
      draw: {
        polyline: false,
        polygon: false,
        rectangle: false
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: false
      }
    }));
  
  map.on('draw:created', function(event) {
      var layer = event.layer;
      console.log(event.layer);
      console.log(event.layerType);
      console.log(drawnItems);
      var feature = {
        options: event.layer.options,
        layerType: event.layerType,
        slide: Router.current().params._id
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
      console.log(feature);
      Markers.insert(feature);
    });
    
    
    map.on('draw:deletestart', function(event) {
      console.log(event);
    });
    
    map.on('draw:deletestop', function(event) {
      console.log(event);
    });
    
    map.on('draw:deleted', function(event) {
      console.log(event);
      console.log(event.target);
    });

    var markerQuery = Markers.find({slide: Router.current().params._id});
    console.log(markerQuery.fetch());
    markerQuery.observe({
      added: function(document) {
        console.log(document);
        switch (document.layerType) {
        case 'marker':
          var marker = L.marker(document.latlng).addTo(drawnItems);
          break;
        case 'circle':
          var circle = L.circle(document.latlng, document.radius).addTo(drawnItems);
          break;
        }
      },
      removed: function(oldDocument) {
        console.log(oldDocument);
        layers = map._layers;
        var key, val;
        for (key in layers) {
          val = layers[key];
          if (val._latlng) {
            if (val._latlng.lat === oldDocument.latlng.lat && val._latlng.lng === oldDocument.latlng.lng) {
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

Template.Slide.destroyed = function() {
};

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
  $('#map').css({
    height: $(window).innerHeight() + 'px'
  });

  var map = L.map('map').setView([0,0], 3);
  var slideTiles = L.tileLayer('/images/blank.png', {id: 'slideTiles', attribution: 'Images &copy; Regents of the University of Minnesota', maxZoom: 8});
  slideTiles.addTo(map);

  var query = Slides.find({_id: Router.current().params._id});
  query.observe({
    added: function (document) {
      slideTiles.setUrl(document.slideUrl + '/{z}/{y}/{x}.jpg');
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

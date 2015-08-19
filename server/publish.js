/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('slides', function( /* args */ ) {
  return Slides.find();
});

Meteor.publish('slide', function(slideId) {
  return Slides.find({
    _id: slideId
  });
}, {
  url: "publications/slide/:0"
});

Meteor.publish('slideMarkers', function(slideId) {
  return Markers.find({
    slide: slideId
  });
}, {
  url: "publications/slideMarkers/:0"
});

Meteor.publish('cases', function () {
  return Cases.find();
});

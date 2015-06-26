/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('slides', function (/* args */) {
  return Slides.find();
});

Meteor.publish('slide', function (slideId) {
  return Slides.find({_id: slideId});
});

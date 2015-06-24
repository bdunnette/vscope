/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('slides', function (/* args */) {
  return Slides.find();
});
HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    return this.subscribe('slides').wait();
  },

  data: function () {
    return {slides: Slides.find()};
  },

  action: function() {
    this.render('Home');
  }
});

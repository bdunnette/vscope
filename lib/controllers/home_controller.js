HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  subscriptions: function() {
    return this.subscribe('slides').wait();
  },

  data: function () {
    return {slides: Slides.find({}, {sort: {createdAt: -1}})};
  },

  action: function() {
    this.render('Home');
  }
});

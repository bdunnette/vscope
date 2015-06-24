Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});

Router.route('slides', {
  name: 'slides',
  controller: 'SlidesController',
  action: 'action',
  where: 'client'
});

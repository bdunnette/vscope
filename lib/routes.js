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

Router.route('slide/:_id', {
  name: 'slide',
  controller: 'SlideController',
  action: 'action',
  where: 'client'
});

Router.route('search', {
  name: 'search',
  controller: 'SearchController',
  action: 'action',
  where: 'client'
});

Router.route('cases', {
  name: 'cases',
  controller: 'CasesController',
  where: 'client'
});

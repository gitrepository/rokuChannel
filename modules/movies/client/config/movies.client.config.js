(function () {
  'use strict';

  angular
    .module('movies')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Movies',
      state: 'movies',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'movies', {
      title: 'List Movies',
      state: 'movies.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'movies', {
      title: 'Create Movie',
      state: 'movies.create',
      roles: ['user']
    });
  }
})();

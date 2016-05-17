(function() {
  'use strict';

  angular
    .module('movies')
    .controller('MoviesListController', MoviesListController);

  MoviesListController.$inject = ['MoviesService'];

  function MoviesListController(MoviesService) {
    var vm = this;

    vm.movies = MoviesService.query();
		
		function remove() {
			alert('l');
      if (confirm('Are you sure you want to delete?')) {
        //vm.movie.$remove($state.go('movies.list'));
      }
    }
  }
})();

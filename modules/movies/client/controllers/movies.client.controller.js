(function() {
  'use strict';

  // Movies controller
  angular
    .module('movies')
    .controller('MoviesController', MoviesController);

  MoviesController.$inject = ['$scope', '$state', '$http', 'Authentication', 'movieResolve', 'Upload'];

  function MoviesController($scope, $state, $http, Authentication, movie, Upload) {
    var vm = this;

    vm.authentication = Authentication;
    vm.movie = movie;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Movie
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.movie.$remove($state.go('movies.list'));
      }
    }

    // Save Movie
    function save(isValid) {
      Upload.upload({
        url: '/api/moviesUpload',
        data: {
          file: vm.movie.file,
          '_id': vm.movie._id,
          'name': vm.movie.name,
          'year': vm.movie.year
        }
      }).then(function(resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function(resp) {
        console.log('Error status: ' + resp.status);
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }
  }
})();

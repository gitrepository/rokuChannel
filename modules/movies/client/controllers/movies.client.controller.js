(function() {
  'use strict';

  // Movies controller
  angular
    .module('movies')
    .controller('MoviesController', MoviesController);

  MoviesController.$inject = ['$scope', '$state', 'Authentication', 'movieResolve', 'Upload'];

  function MoviesController($scope, $state, Authentication, movie, Upload) {
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
      console.log('File Info: ' + vm.movie.file.name + ' Year ' + vm.movie.year);
      console.log(vm.movie.file);

      Upload.upload({
        url: '/api/moviesUpload',
        data: {
          file: vm.movie.file,
          'movie.id': vm.movie._id,
          'movie.name': vm.movie.name,
          'movie.year': vm.movie.year
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

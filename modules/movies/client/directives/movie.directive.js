'use strict';
/*
angular.module('movies')
  .directive('youtube', function() {
    return {
      restrict: 'E',
      scope: {
        src: '='
      },
      templateUrl: 'modules/movies/client/views/directive/youtube.html'
    };
  });
*/

angular.module('movies')
  .directive('dynamicUrl', function() {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attr) {
				console.log(scope.vm.movie._id);
        element.attr('src', '/api/moviesDownload/'+scope.vm.movie._id);
      }
    };
  });

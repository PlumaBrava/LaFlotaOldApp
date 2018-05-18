'use strict';

/**
 * @ngdoc directive
 * @name laFlotaApp.directive:ngSelectSong
 * @description
 * # ngSelectSong
 */
angular.module('laFlotaApp')
  .directive('ngSelectSong', function () {
    var localIndex;
return {
     // template: '<div class='btn btn-primary'></div>',
  restrict: 'A',
// replace: true,
//  restrict: "EA",
// scope: {
//             index: '@'
//         },
    link: function($scope,el,atributos){
 console.log('ngSelectSong');
 console.log($scope.$index);
localIndex=$scope.$index;
 console.log(atributos);
 console.log(el);
      el.bind('change', function(e){
        console.log('ngSelectSong');
             console.log(localIndex);
             console.log($scope.$index);
         console.log($scope);

         console.log(atributos);
        console.log(e);
        console.log($scope.$index);
        $scope.file = (e.srcElement || e.target).files[0];
        try{
          console.log('try');
          var tmppath = URL.createObjectURL(e.target.files[0]);
          console.log(tmppath);
          $scope.$apply(function () {
            $scope.path = (tmppath);
          });
        }catch(err){
          console.log('catch al buscar URL de archivo nulo');
          console.log(err);
          $scope.$apply(function () {
            $scope.path = null;
          });
        }

        // $scope.getSongFile($scope);
      });

    }

  };
  });

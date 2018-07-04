'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:MisplanesvigentesCtrl
 * @description
 * # MisplanesvigentesCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
.controller('MisplanesvigentesCtrl', ['$scope','$state', '$stateParams','firebaseservice', '$translate','$uibModal','subirArchivo','subirarchivosong', function ($scope,$state, $stateParams, fb,$translate,$uibModal,subirArchivo,subirarchivosong) {
   console.log('MisplanesvigentesCtrl');
   var self=this;
    fb.listarMisPlanes()
   .then(function(data){
    console.log(data);
    $scope.misPlanes=data.result;
   })
   .catch(function(error){} );

  }]);

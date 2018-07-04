'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:MiscomprasCtrl
 * @description
 * # MiscomprasCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
.controller('MiscomprasCtrl', ['$scope','$state', '$stateParams','firebaseservice', '$translate','$uibModal','subirArchivo','subirarchivosong', function ($scope,$state, $stateParams, fb,$translate,$uibModal,subirArchivo,subirarchivosong) {
   console.log('MiscomprasCtrl');
   var self=this;
   fb.listarMisCompras()
   .then(function(data){
    console.log(data);
    $scope.miListaDeCompras=data.result;
   })
   .catch(function(error){} );
  }]);

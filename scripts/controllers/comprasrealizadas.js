'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ComprasrealizadasCtrl
 * @description
 * # ComprasrealizadasCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')

.controller('ComprasrealizadasCtrl', ['$scope','$state', '$stateParams','firebaseservice', '$translate','$uibModal','subirArchivo','subirarchivosong', function ($scope,$state, $stateParams, fb,$translate,$uibModal,subirArchivo,subirarchivosong) {
   console.log('ComprasrealizadasCtrl');
   var self=this;
   fb.listarCompras()
   .then(function(data){
    console.log(data);
    $scope.ListaDeCompras=data.result;
   })
   .catch(function(error){} );
  }]);

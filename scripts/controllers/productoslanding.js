'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ProductoslandingCtrl
 * @description
 * # ProductoslandingCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
  // .controller('ProductoslandingCtrl', function () {
   .controller('ProductoslandingCtrl', ['$scope','$state','firebaseservice', function ($scope,$state,fb) {
        console.log('ProductoslandingCtrl');
var self=this;


$scope.error="sin error";
$scope.listaProductosLanding={};


fb.listarProductosLanding()
    .then(function(dato){
        console.log('listarProductos',dato);
        $scope.listaProductosLanding=dato.result;
        console.log('listarProductos',$scope.listaProductos);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listarUsuariosConsultas',error);
    });


  }]);
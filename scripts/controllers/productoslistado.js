'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ProductoslistadoCtrl
 * @description
 * # ProductoslistadoCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
  // .controller('ProductoslistadoCtrl', function () {
  .controller('ProductoslistadoCtrl', ['$scope','$state','firebaseservice', function ($scope,$state,fb) {
        console.log('ProductoslistadoCtrl');
var self=this;


$scope.error="sin error";
$scope.listaProductos={};
$scope.modificarProducto=function(producto){
     console.log('modificarProducto ');
        $state.go('producto',{producto:producto});

};


fb.listarProductos()
    .then(function(dato){
        console.log('listarProductos',dato);
        $scope.listaProductos=dato.result;
        console.log('listarProductos',$scope.listaProductos);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listarUsuariosConsultas',error);
    });

$scope.crearProducto=function(){
 console.log('crearProducto ');
        $state.go('producto',{producto:null});
};
  }]);

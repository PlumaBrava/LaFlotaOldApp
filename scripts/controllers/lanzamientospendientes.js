'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:LanzamientospendientesctrlCtrl
 * @description
 * # LanzamientospendientesctrlCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')

 .controller('LanzamientosPendientesCtrl', ['$scope','$state','firebaseservice', function ($scope,$state,fb) {
        console.log('LanzamientosPendientesCtrl');
var self=this;


$scope.error="sin error";
$scope.listaLanzamientosPendientes={};
$scope.modificarProducto=function(producto){
     console.log('crearProducto ');
        $state.go('producto',{producto:producto});

};


fb.listarLanzamientosPendientes()
    .then(function(dato){
        console.log('LanzamientosPendientes',dato);
        $scope.listaLanzamientosPendientes=dato.result;
        console.log('LanzamientosPendientes',$scope.listaLanzamientosPendientes);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listarUsuariosConsultas',error);
    });


  }]);
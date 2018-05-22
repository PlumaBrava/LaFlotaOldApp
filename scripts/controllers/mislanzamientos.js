'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:MislanzamientosCtrl
 * @description
 * # MislanzamientosCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')

  .controller('MislanzamientosCtrl', ['$scope','$state','firebaseservice', function ($scope,$state,fb) {
        console.log('MislanzamientosCtrl');
var self=this;


$scope.error="sin error";
$scope.listaLanamientosUsuario={};
$scope.modificarLanzamiento=function(lanzamiento){
     console.log('modificarLanzamiento ');
        $state.go('lanzamientodetalle',{lanzamiento:lanzamiento});

};


fb.listarListarLanzamientosUsuarios()
    .then(function(dato){
        console.log('listarListarLanzamientosUsuarios',dato);
        $scope.listaLanamientosUsuario=dato.result;
        console.log('listarListarLanzamientosUsuarios',$scope.listaLanamientosUsuario);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listarListarLanzamientosUsuarios',error);
    });

$scope.crearLanzamiento=function(){
 console.log('crearLanzamiento ');
        $state.go('lanzamientodetalle');
};
  }]);


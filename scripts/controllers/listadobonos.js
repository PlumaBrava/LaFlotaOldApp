'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ListadobonosCtrl
 * @description
 * # ListadobonosCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
    .controller('ListadobonosCtrl', ['$scope','$state','firebaseservice', function ($scope,$state,fb) {
        console.log('ProductoslistadoCtrl');
        var self=this;


$scope.error="sin error";
$scope.listaBonos={};
$scope.modificarBono=function(bono){
     console.log('modificarBono');
        $state.go('bonos',{bono:bono});

};


fb.listarBonos()
    .then(function(dato){
        console.log('listarBonos',dato);
        $scope.listaBonos=dato.result;
        console.log('listarBonos',$scope.listaProductos);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listarBonos',error);
    });

$scope.crearBono=function(){
 console.log('crearBono ');
        $state.go('bonos',{bono:null});
};

  }]);

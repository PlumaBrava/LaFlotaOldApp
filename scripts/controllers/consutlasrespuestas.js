'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ConsutlasrespuestasCtrl
 * @description
 * # ConsutlasrespuestasCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
  // .controller('ConsutlasrespuestasCtrl', function () {

  .controller('ConsutlasrespuestasCtrl', ['$scope','$state','firebaseservice', function ($scope,$state,fb) {
        console.log('ConsutlasrespuestasCtrl');
var self=this;
$scope.listaConsultasPendientes={};
fb.listarConsultasPendientes()
    .then(function(dato){
        console.log('cont listaConsultasPendientes',dato);
        $scope.listaConsultasPendientes= dato.result;
        // $scope.listaConsultasPendientes=fb.snapshotToArray(dato.result);

        console.log('cont listaConsultasPendientes');
        console.log($scope.listaConsultasPendientes);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listaConsultasPendientes',error);
    });

    $scope.responderConsulta=function(consulta){
   console.log('responderConsulta', consulta);
   fb.responderConsulta(consulta);
};

  }]);

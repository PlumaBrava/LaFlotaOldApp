'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ConsultasCtrl
 * @description
 * # ConsultasCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')


  .controller('ConsultasCtrl', ['$scope','$state','firebaseservice', function ($scope,$state,fb) {
        console.log('ConsultasCtrl');
var self=this;


$scope.subjet='';
$scope.mensaje='';
$scope.error="sin error";
$scope.listaConsultas={};
$scope.crearUsuarioConsulta=function(titulo, mensaje,mensajekey){
     console.log('crearMensaje '+titulo);
     console.log('crearMensaje '+mensaje);

     if(!titulo){
        $scope.error="mensajeSinTitulo";
     }
     else if(!mensaje){
        $scope.error="mensajeSinTexto";
     } else {
        $scope.error="enviandoMensaje";
         fb.crearUsuarioConsulta(titulo,mensaje,mensajekey);
     }
};


$scope.agregarMensaje_UsuarioConsulta=function(consulta,mensaje){
     console.log('agregarMensaje_UsuarioConsulta '+consulta);
     console.log('agregarMensaje_UsuarioConsulta '+mensaje);

   if(!mensaje){
        $scope.error="mensajeSinTexto";
     } else {
        $scope.error="enviandoMensaje";
         fb.agregarMensajeAConsulta(consulta,mensaje);
     }
};




fb.listarUsuariosConsultas()
    .then(function(dato){
        console.log('cont listarUsuariosConsultas',dato);
        $scope.listaConsultas=dato.result;
        console.log('cont listarUsuariosConsultas',$scope.listaUsuarios);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listarUsuariosConsultas',error);
    });


  }]);

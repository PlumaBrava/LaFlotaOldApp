'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:UsuariosperfilesCtrl
 * @description
 * # UsuariosperfilesCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
  // .controller('UsuariosperfilesCtrl', function () {
     .controller('UsuariosperfilesCtrl', ['$scope','$state','firebaseservice', function ($scope,$state,fb) {
        console.log('UsuariosperfilesCtrl');

// fb.buscarUsuario('3jjjssda')
//     .then(function(dato){
//         console.log('buscarUsuario',dato);
//     })
//     .catch(function(error){
//          console.log('buscarUsuario',error);
//     });
var self=this;
this.listaUsuarios={};
$scope.buscarUsuario=function(mail){
    console.log('buscarUsuario',mail)
    for (var i = 0; i < self.listaUsuarios.length; i+=1) {

    if(self.listaUsuarios[i].mail==mail){
         console.log('buscarUsuario true');
        return true;

    };

};
    console.log('buscarUsuario false');
    return false;
};


fb.listarUsuarios()
    .then(function(dato){
        console.log('listarUsuarios',dato);
        self.listaUsuarios=dato.result;
        console.log('listarUsuarios',self.listaUsuarios);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('listarUsuarios',error);
    });

$scope.crearUsuario=function(email){
     console.log('crearUsuario '+email);
     console.log('crearUsuario '+$scope.useremail);

     if(!email){
        $scope.errorMailUsuario="mailIncorrecto";

     }else if ($scope.buscarUsuario(email)){
        $scope.errorMailUsuario="mailExistente";
     } else{

     $scope.errorMailUsuario="";
        var a={"habilitado":true,
          "perfil":{
            "usuarios":false,
            "cargarCanciones":false,
            "cargarPagos":false,
            "planes":false,
            "bonos":false,
            "consultas":false,
            "finanzas":false,
            "cargarLiquidaciones":false
        }};
 fb.crearUsuario(email,a);

        }
};


$scope.perfilModificado=function(){
    console.log("perfilModificado");
};
$scope.deshabilitarUsuario=function(usuario){
    usuario.habilitado=false;
    fb.modificarUsuario(usuario);
};

$scope.modificarUsuario=function(usuario){
    usuario.habilitado=true;
    fb.modificarUsuario(usuario);
};

  // $scope.status = {
  //   isCustomHeaderOpen: true,
  //   isFirstOpen: true,
  //   isFirstDisabled: false
  // };
  //  $scope.groups = [
  //   {
  //     title: 'Dynamic Group Header - 1',
  //     content: 'Dynamic Group Body - 1'
  //   },
  //   {
  //     title: 'Dynamic Group Header - 2',
  //     content: 'Dynamic Group Body - 2'
  //   }
  // ];

  // $scope.items = ['Item 1', 'Item 2', 'Item 3'];
  }]);

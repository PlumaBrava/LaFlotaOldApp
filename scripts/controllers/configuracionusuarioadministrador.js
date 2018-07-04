'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ConfiguracionusuarioadministradorCtrl
 * @description
 * # ConfiguracionusuarioadministradorCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
.controller('ConfiguracionusuarioadministradorCtrl', ['$scope','$state','firebaseservice', function ($scope,$state,fb) {
    console.log('ConfiguracionusuarioadministradorCtrl');
    var self=this;
    this.listaUsuarios={};
    // $scope.err="sin error";
    $scope.grabar=false;

$scope.guardarConfiguracion=function(email, pass){
    var usuario=fb.getUsuario();
    console.log(usuario);
    $scope.grabar=true;
    var usuarioAdministrador=$scope.buscarUsuario(usuario.email);
    fb.configurarUsuarioAdministrador(email, pass,usuarioAdministrador);
};

fb.listarUsuarios()
    .then(function(dato){
        console.log('listarUsuarios',dato);
        self.listaUsuarios=dato.result;
        console.log('listarUsuarios',self.listaUsuarios);

            $scope.buscarUsuario(fb.getUsuario().email);
            // fb.leerDatosUsuarioAdministrador()
            //     .then(function(data){
            //         console.log('leerDatosUsuarioAdministrador',data);
            //         $scope.email=data.mail;
            //         $scope.pass=data.pass;
            //         })
            //     .catch(function(error){});

          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('listarUsuarios',error);
    });

$scope.buscarUsuario=function(mail){
    console.log('buscarUsuario',mail)
    for (var i = 0; i < self.listaUsuarios.length; i+=1) {

        if(self.listaUsuarios[i].mail==mail && !$scope.grabar){
             console.log('buscarUsuario true');
                if(self.listaUsuarios[i].configuracionAdministrador){
                    $scope.email=self.listaUsuarios[i].configuracionAdministrador.mail;
                    $scope.pass=self.listaUsuarios[i].configuracionAdministrador.pass;
                }

            return self.listaUsuarios[i];
        };
    };
};



}]);

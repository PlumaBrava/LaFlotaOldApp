'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
  .controller('MainCtrl', ['$scope','$localStorage','$translate', '$firebaseAuth','firebaseservice','$state', function ($scope,localStorage,$translate,firebaseAuth,fb,$state) {

var self=this;
    $scope.logueado=false;
     $scope.perfilUsuario=null;
     $scope.userMail=null;
    console.log('MainCtrl localStorage.userKey : ');
    console.log(localStorage.user);
if(localStorage.user){
    $scope.logueado=true;
    console.log('MainCtrl $scope.logueado true : '+$scope.logueado);
} else{
      console.log('MainCtrl $scope.logueado false: '+$scope.logueado);
};

 $scope.switchLanguage = function(key) {
      $translate.use(key);
      console.log('switchLanguage: '+ key);
    };
 var auth = firebaseAuth();

auth.$onAuthStateChanged(function(firebaseUser) {
  if (firebaseUser) {
    console.log(firebaseUser);
    console.log(firebaseUser.email);
    $scope.verificarSiEsUsuarioAministrativo(firebaseUser.email);
    // console.log('Signed in as:', firebaseUser.uid);
    $scope.showBar=true;
    console.log('$scope.showBar:', $scope.showBar);
    $scope.firebaseUser=firebaseUser;
    if(firebaseUser.displayName){
    $scope.user=firebaseUser.displayName;
    }else{
        $scope.user=firebaseUser.email;
    }
    if(firebaseUser.photoURL){
           console.log('firebaseUser.photoURL:', firebaseUser.photoURL);
            // $scope.$apply(function () {
            $scope.photoURLshow=true;
            $scope.photoURL=firebaseUser.photoURL;
        //     if($location.url()==='/login'){
        //     $state.go('mispracticas');
        // };
            // } );
        // console.log('$scope.photoURLshow:', $scope.photoURLshow);
        // console.log('$scope.photoURL:', $scope.photoURL);
    }
     // console.log('state Main to mis practicas');
     // console.log($location);
     // console.log($location.url());
     // console.log($location.path);

  // $state.go('mispracticas');
  } else {
    console.log('Signed out');
     console.log('state Main to mis practicas');
       $state.go('home');
     // console.log($state.current);
     // console.log('$urlRouterProvider');
// console.log($location);
//      console.log($location.url());
//      console.log($location.path);
  $scope.esAdministrativo=false;
 localStorage.user=null;
  $scope.logueado=false;
     $scope.perfilUsuario=null;
     $scope.userMail='';
    // $scope.user='Sign Up';
    $scope.user=null;
    $scope.photoURL=null;
    $scope.photoURLshow=false;
     $scope.photoURLshow=false;
    $scope.$apply(function () {
    $scope.photoURL=null;
    $scope.photoURLshow=false;
     $scope.showBar=false;
     console.log('$scope.showBar:', $scope.showBar);
    // if($location.url()!=='/practicarlink'){
    // if($location.url().indexOf('practicarlink')===-1){
    //  $state.go('home');
    // }
    } );
     // console.log('$scope.photoURLshow:', $scope.photoURLshow);
     //    console.log('$scope.photoURL:', $scope.photoURL);
  }
});

$scope.logOut=function(){
  console.log('logOut');

  auth.$signOut()
    .then(function() {
        console.log('logOut exitoso');
           localStorage.user=user;
  // $state.go('home');
    })
    .catch(function(error) {
        console.log('logOut error');
      // An error happened
    });
};

  $scope.verificarSiEsUsuarioAministrativo=function(email){
fb.listarUsuarios()
    .then(function(dato){
        console.log('listarUsuarios',dato);
        self.listaUsuarios=dato.result;
        if($scope.buscarUsuario(email)){
console.log('verificarSiEsUsuarioAministrativo true');
$scope.esAdministrativo=true;
        }else {
          $scope.esAdministrativo=false;
          console.log('verificarSiEsUsuarioAministrativo false');
        };
    $scope.$apply(function () {});

    })
    .catch(function(error){
         console.log('listarUsuarios',error);
    });

};

$scope.buscarUsuario=function(mail){
    console.log('buscarUsuario',mail)
    var existeElMail=false;
    for (var i = 0; i < self.listaUsuarios.length; i+=1) {

    if(self.listaUsuarios[i].mail==mail && self.listaUsuarios[i].habilitado){
         console.log('buscarUsuario true');
        existeElMail=true;
        $scope.perfilUsuario=self.listaUsuarios[i].perfil;
        break;
      } ;

};

    return existeElMail;
};


  }]);

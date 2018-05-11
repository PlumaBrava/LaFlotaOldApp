'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')

 .controller('LoginCtrl',['$state','$scope','$firebaseAuth','$localStorage',
    function ($state,$scope,firebaseAuth, $localStorage) {


  console.log('LoginCtrl');
  console.log($state);
  var self=this;
  $scope.err=null;


$scope.activarRegistro=function(){
 $scope.createMode=true;
}

$scope.cancelarRegistro=function(){
 $scope.createMode=false;
}






this.emailPasswordLogin=function(email, password){
 $scope.err = '';
    console.log('passwordLogin');
    console.log('email '+ email);
    console.log('password '+ password);
   // if (fb.isUserLog()){
   //     $state.go('practica');
   //  }else {

      if( !email) {
        // this.muestraMensaje('Please enter a email');
        $scope.err = 'Please enter a email';

      }
      else if( !password) {

        $scope.err = 'Passwords nullo';
        // this.muestraMensaje('Passwords nullo');

          }

  var auth = firebaseAuth();



  auth.$signInWithEmailAndPassword(email, password)
    .then(function(CallBackuser){
          console.log(CallBackuser);
          if(CallBackuser){
          // var user = firebase.auth().currentUser;
         console.log('CallBackuser: '+CallBackuser.email);
        // console.log('user mail: '+user.email);
        // console.log('user uid: '+user.uid);
        // console.log(user);
           $scope.err=CallBackuser.email;
   self.muestraMensaje('Signed in as:'+ CallBackuser.displayName);
  self.registrarUsuario(CallBackuser);

        // fb.setUserKey(user.uid);
        // fb.setUser(user.email);
        // self.readUser(user.uid);
        // self.readPerfil(user.uid);
      }
    })
  .catch(function(error) {
  // Handle Errors here.
  console.log('error');
  console.log(error);
  // var errorCode = error.code;
  var errorMessage = error.message;

   $scope.err=errorMessage;

  });

  // };
};


this.createAccount=function(email, password,confirm){
  console.log('createAccount');
  console.log('email '+ email);
  console.log('password '+ password);
  console.log('confirm '+ confirm);

  $scope.err = 'crear cuenta';
      if( !password) {
        self.muestraMensaje('Please enter a password');
      }
      else if( password !== confirm ) {
         self.muestraMensaje('error: '+'Passwords do not match');
      }
      else {
        var auth = firebaseAuth();
        auth.$createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          var errorMessage = error.message;
          console.log('error: '+errorMessage);
          self.muestraMensaje('error: '+errorMessage);

        })
        .then(function(CallBackuser){
            console.log(CallBackuser);
            if(CallBackuser){
            // var user = firebase.auth().currentUser;
            self.muestraMensaje('mail: '+CallBackuser.email);
            console.log('CallBackuser: '+CallBackuser.email);
            self.registrarUsuario(CallBackuser);
            // console.log('user mail: '+user.email);
  //          console.log(user);

            }
        })
  .catch(function(error){
    console.log('crear cuenta: '+error);
  });
};
};


// this.loginFacebook=function(){
//     console.log('loginFacebook ');
//     $scope.err='loginFacebook ';
//     // if (fb.isUserLog()){
//     //    $state.go('practica');
//     // }else {


//  // var auth = $firebaseAuth();
//  var auth = firebaseAuth();
//    console.log(auth);
//   // login with google.com
//   auth.$signInWithPopup('facebook').then(function(firebaseUser) {
//   console.log(firebaseUser);
//     console.log('Signed in as:', firebaseUser.user.displayName);
//   self.muestraMensaje('Signed in as:'+ firebaseUser.user.displayName);
//   self.registrarUsuario(firebaseUser.user);
//     // console.log(firebaseUser);
//   }).catch(function(error) {
//     console.log('Authentication failed:', error);
//     console.log( error);
//     self.muestraMensaje('Authentication failed:'+ error);
//   });
// };


// this.loginGoogle=function(){
//     console.log('login Google ');
//     $scope.err='login Google ';
//     // if (fb.isUserLog()){
//     //    $state.go('practica');
//     // }else {


//  // var auth = $firebaseAuth();
//  var auth = firebaseAuth();
//    console.log(auth);
//   // login with google.com
//   auth.$signInWithPopup('google').then(function(firebaseUser) {
//   console.log(firebaseUser);
//     console.log('Signed in as:', firebaseUser.user.displayName);
//   self.muestraMensaje('Signed in as:'+ firebaseUser.user.displayName);
//   self.registrarUsuario(firebaseUser.user);
//     // console.log(firebaseUser);
//   }).catch(function(error) {
//     console.log('Authentication failed:', error);
//     console.log( error);
//     self.muestraMensaje('Authentication failed:'+ error);
//   });
// };


this.muestraMensaje =function(mensaje){
                // $scope.$apply(function () {
                   $scope.err = mensaje;
                   // } );
};


this.sendPasswordResetEmail=function(email){
  var auth = firebaseAuth();
  console.error(email);
  if(!email){
    self.muestraMensaje('Ingrese un email valido');
  }else{
  auth.$sendPasswordResetEmail(email).then(function() {
  console.log('Password reset email sent successfully!');
  self.muestraMensaje('Password reset email sent successfully!');
}).catch(function(error) {
   console.log(error);
   self.muestraMensaje(error.message);

});

}
};

this.registrarUsuario=function(user){
     console.log(user);
     // fb.setUserKey(user.uid);
     var u={};
     u.displayName=user.displayName;
     u.email=user.email;
      $localStorage.user=user;
$state.go('home');
    // fb.setUser(u);
    // fb.setUser(firebaseUser.user.providerData[0]);
    // fb.setUser(firebaseUser.user);
};


}]);
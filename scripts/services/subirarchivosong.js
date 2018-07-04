'use strict';

/**
 * @ngdoc service
 * @name laFlotaApp.subirarchivosong
 * @description
 * # subirarchivosong
 * Factory in the laFlotaApp.
 */
angular.module('laFlotaApp')
  // .factory('subirarchivosong', function () {
  //   // Service logic
  //   // ...

  //   var meaningOfLife = 42;

  //   // Public API here
  //   return {
  //     someMethod: function () {
  //       return meaningOfLife;
  //     }
  //   };
  // });
    .service('subirarchivosong',['$q', '$firebaseStorage', function ($q,$firebaseStorage) {


    var self=this;


    var subirArchivo = function (file, scope,path,indice) {
      console.log("subirArchivo");
 console.log(file);
  console.log(scope);
   console.log(path);
    var deferred = $q.defer();
    var ModalScopeA=scope;
    var indiceA=indice;

  var storageRef = firebase.storage().ref(path+'/'+file.name);
  var storage = $firebaseStorage(storageRef);

  var uploadTask = storage.$put(file);
  uploadTask.$progress(function(snapshot) {

      ModalScopeA.$broadcast('fileProgressSong',
                    {
                        indice:indiceA,
                        total: snapshot.totalBytes,
                        loaded: snapshot.bytesTransferred
                    });
      var percentUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percentUploaded);
  });

  uploadTask.$complete(function(snapshot) {
      console.log( ' subirArchivo complete');
      console.log(snapshot);
      ModalScopeA.$evalAsync(function () {
      deferred.resolve(snapshot);
      });
  });

  uploadTask.$error(function(error) {
      console.log(' subirArchivo error');
      console.log(error);
      ModalScopeA.$evalAsync(function () {
      deferred.reject(error);
      });
  });

return deferred.promise;


        };








    // Public API here
    return {
      subirArchivo:subirArchivo

    };
  }]);
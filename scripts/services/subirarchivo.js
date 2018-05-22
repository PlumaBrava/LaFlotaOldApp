'use strict';

/**
 * @ngdoc service
 * @name laFlotaApp.subirArchivo
 * @description
 * # subirArchivo
 * Factory in the laFlotaApp.
 */
angular.module('laFlotaApp')
  // .factory('subirArchivo', function () {
    // Service logic
    // ...
      .factory('subirArchivo',['$q', '$firebaseStorage', function ($q,$firebaseStorage) {

    var meaningOfLife = 42;
    var self=this;
    this.ModalScopeA=null;
    this.deferred=null;

    var subirArchivo = function (file, scope,path) {
      console.log("subirArchivo");
 console.log(file);
  console.log(scope);
   console.log(path);
    self.deferred = $q.defer();
    self.ModalScopeA=scope;

  var storageRef = firebase.storage().ref(path+'/'+file.name);
  var storage = $firebaseStorage(storageRef);

  var uploadTask = storage.$put(file);
  uploadTask.$progress(function(snapshot) {

      self.ModalScopeA.$broadcast('fileProgress',
                    {
                        total: snapshot.totalBytes,
                        loaded: snapshot.bytesTransferred
                    });
      var percentUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percentUploaded);
  });

  uploadTask.$complete(function(snapshot) {
      console.log( ' subirArchivo complete');
      console.log(snapshot);
      self.ModalScopeA.$evalAsync(function () {
      self.deferred.resolve(snapshot);
      });
  });

  uploadTask.$error(function(error) {
      console.log(' subirArchivo error');
      console.log(error);
      self.ModalScopeA.$evalAsync(function () {
      self.deferred.reject(error);
      });
  });

return self.deferred.promise;


        };








    // Public API here
    return {
      subirArchivo:subirArchivo
      // someMethod: function () {
      //   return meaningOfLife;
      // }
    };
  }]);

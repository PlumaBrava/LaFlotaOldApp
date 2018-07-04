'use strict';

/**
 * @ngdoc service
 * @name laFlotaApp.spotiService
 * @description
 * # spotiService
 * Service in the laFlotaApp.
 */
angular.module('laFlotaApp')
// .service('spotiService',['$localStorage','$q','Spotify','$http', function (localStorage,$q,Spotify,$http) {
.service('spotiService',['$localStorage','$q','$http', function (localStorage,$q,$http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
self=this;
this.deviceOK=false;

this.getSpotifyAccessTocken=function(){
      console.log('getSpotifyAccessTocken ');
      console.log(localStorage.spotifyToken);
      console.log(localStorage.spotifyTokenExpiresIn);
      console.log(localStorage.spotifyTokenTokenType);
  console.log("Date.now()");
        console.log(localStorage.spotifyTokenTime);
      console.log(Date.now()-localStorage.spotifyTokenTime);
      if(Date.now()-localStorage.spotifyTokenTime>3600000)// si es mas de una hora 3600seg
        {return null;}                                    // si este valor es nullo se dispara la busqueda de un nuevo toquen
      return   localStorage.spotifyToken;
    };

this.setSpotifyAccessTocken=function(tocken){
      console.log('setSpotifyAccessTocke ');
    localStorage.spotifyToken=tocken;
   localStorage.spotifyTokenTime=Date.now();
    console.log("Date.now()");
    console.log(Date.now());

    };

this.getSpotifyUserID=function(){
      console.log('getSpotifyUserID ');
      console.log(localStorage.setSpotifyUserID);


      return   localStorage.setSpotifyUserID;
    };

this.getSpotifyDevices=function(){
      console.log('getSpotifyDevices ');
      console.log(localStorage.SpotifyDevices);
      return   localStorage.SpotifyDevices;
    };

this.getSpotifyDevicesVolumen=function(){
    // Retorna el volumen del primer reproductor
      console.log('getSpotifyDevices.mVolumen ');
      console.log(self.mVolumen);
      return   self.mVolumen;
    };

this.setSpotifyUserID=function(userID){
      console.log('setSpotifyUserID ');
    localStorage.setSpotifyUserID=userID;
    };


this.inicializaSpotify=function(){
 return $q(function (resolve, reject){
      Spotify.login()
      .then(function (data) {
        console.log('Loggin a Spotify 3');
        console.log(data);
        self.setSpotifyAccessTocken(data);
        self.getSpotifyUser().then(function(r){
                    resolve({ value: "PlaySong tiempo cumplido", result:data});
                });
    })
      .catch(function(error){
        console.log('error');
             reject({ value: "inicializaSpotify error", result: error});
        console.log(error);
        });
});
};
this.getSpotifyToken=function(){
 return $q(function (resolve, reject){


var headers = {

                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : 'GET',
            };


var req ={
  method: 'GET',
  url: 'https://us-central1-laflota-19ada.cloudfunctions.net/getSpotifyToken',
  headers: headers,
  }



  $http(req).then(function (response) {
    console.log('getUserProfile respuesta', response.data);
    console.log( response);
    localStorage.spotifyProfile=response.data;

  }, function (error) {
    console.log('getUserProfile error', error.data);
  });



});
};

this.getSpotifyArtista=function(artista){
 return $q(function (resolve, reject){



var headers = {

                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : 'GET',
            };


var req ={
  method: 'GET',
  url: 'https://us-central1-laflota-19ada.cloudfunctions.net/getSpotifyArtista',
  headers: headers,
  params: {'artista':artista}
  }



  $http(req).then(function (response) {
    console.log('getUserProfile respuesta', response.data);
    localStorage.spotifyProfile=response.data;

  }, function (error) {
    console.log('getUserProfile error', error.data);
  });



});
};





// Get Spotify User ID

this.getSpotifyUser=function(){
    return $q(function (resolve, reject){
    Spotify.getCurrentUser().then(function (data) {
        console.log('getSpotifyUser');
        console.log(data);
        self.setSpotifyUserID(data.data.id)
        self.getUserProfile().then(function(r){
             console.log('getUserProfile respuesta getUserProfile');
              resolve({ value: "getUserProfile ok", result:data});
        });;
    }).catch(function(error){
        console.log('getSpotifyUser error');
        console.log(error);
    });

});
};

// get Spotify user profile.

this.getUserProfile=function(){
  console.log('getUserProfile');
 return $q(function (resolve, reject){
  var req = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
  };
  req.headers.Authorization='Bearer ' +self.getSpotifyAccessTocken();
  $http(req).then(function (response) {
    console.log('getUserProfile respuesta', response.data);
    localStorage.spotifyProfile=response.data;
    self.getDevices().then(
        function(r){
             console.log('getUserProfile respuesta getDevicesSpotify', response);
              resolve({ value: "getUserProfile ok", result:response.data});
        });
  }, function (error) {
    console.log('getUserProfile error', error.data);
  });
});
};


// Verifica si esta habierto spotify y activo (play una cancion)

this.getDevices=function(){
 return $q(function (resolve, reject){
  console.log('getDevicesSpotify');
var reqDevices = {
 method: 'GET',
 url: 'https://api.spotify.com/v1/me/player/devices',
 headers: {
   'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
};
reqDevices.headers.Authorization='Bearer ' +self.getSpotifyAccessTocken();
  $http(reqDevices).then(function (response) {
    console.log('reqDevices is good', response.data);
    console.log(response);
    localStorage.SpotifyDevices=response.data.devices;
    if(!response.data){
        alert('Debe abrir spotify para ejecutar canciones desde la application');

       } else if(response.data.devices.length==0){
          alert('Debe abrir spotify para ejecutar canciones desde la application');
          self.deviceOK=false;
            }else if(!response.data.devices[0].is_active){
             alert('Spotify no esta activo. Ponga play a una cancion ');
             self.deviceOK=false;
                }else{
                    console.log("volumen"+response.data.devices[0].volume_percent);
                    self.mVolumen=response.data.devices[0].volume_percent;
                    self.deviceOK=true;
                    };
      resolve({ value: "getDevicesSpotify ok", result:response});
}, function (error) {
    console.log('reqDevices an error ', error.data);
    self.deviceOK=false;
});
});

};

this.isSpotifyReady=function(){

    if(self.getSpotifyAccessTocken&&self.getSpotifyUserID){
        // if(self.getSpotifyDevices()){
        if(self.deviceOK){
                return true;
        } else{
            self.getDevices();
            return false;
        }
    } else {
        self.inicializaSpotify();
        return false;
    };
};

this.clearSpotify=function(){
localStorage.spotifyToken=null;
localStorage.setSpotifyUserID=null;
localStorage.SpotifyDevices=null;
};

  }]);

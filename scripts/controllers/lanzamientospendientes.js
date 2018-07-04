'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:LanzamientospendientesctrlCtrl
 * @description
 * # LanzamientospendientesctrlCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')

 .controller('LanzamientosPendientesCtrl', ['$scope','$state','firebaseservice','$window', '$rootScope', function ($scope,$state,fb,$window, $rootScope) {
        console.log('LanzamientosPendientesCtrl');
var self=this;


$scope.error="sin error";
$scope.listaLanzamientosPendientes={};
$scope.modificarProducto=function(producto){
     console.log('crearProducto ');
        $state.go('producto',{producto:producto});

};


fb.listarLanzamientosPendientes()
    .then(function(dato){
        console.log('LanzamientosPendientes',dato);
        $scope.listaLanzamientosPendientes=dato.result;
        console.log('LanzamientosPendientes',$scope.listaLanzamientosPendientes);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listarUsuariosConsultas',error);
    });



$scope.linksDeCanciones = [
   {download: 'https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FXw57QmOvYIfKARsPzPojXtYD9mu1%2F2-Trat%C3%A9.mp3?alt=media&token=b87506a9-33f4-461b-99e2-923ae9e381a8', filename: "regs0.mp3" },
 {download: 'https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FXw57QmOvYIfKARsPzPojXtYD9mu1%2F3-%20Te%20Quiero%20Asi.mp3?alt=media&token=dbaa4ade-ef6c-405c-a8e0-0f9b841552f3', filename: "regs2.mp3" },
 {download: 'https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FXw57QmOvYIfKARsPzPojXtYD9mu1%2F4-Lunita%20de%20Verano.mp3?alt=media&token=182b165c-c3aa-46b8-952e-18aed634f61c', filename: "regs3.mp3" }
];


$scope.linksZip = [
  'https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FXw57QmOvYIfKARsPzPojXtYD9mu1%2F2-Trat%C3%A9.mp3?alt=media&token=b87506a9-33f4-461b-99e2-923ae9e381a8',
  'https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FXw57QmOvYIfKARsPzPojXtYD9mu1%2F3-%20Te%20Quiero%20Asi.mp3?alt=media&token=dbaa4ade-ef6c-405c-a8e0-0f9b841552f3',
  'https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FXw57QmOvYIfKARsPzPojXtYD9mu1%2F4-Lunita%20de%20Verano.mp3?alt=media&token=182b165c-c3aa-46b8-952e-18aed634f61c'
];


$scope.downloadAll=function() {

    var links = [
  'https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FXw57QmOvYIfKARsPzPojXtYD9mu1%2F2-Trat%C3%A9.mp3?alt=media&token=b87506a9-33f4-461b-99e2-923ae9e381a8',
  'https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FXw57QmOvYIfKARsPzPojXtYD9mu1%2F3-%20Te%20Quiero%20Asi.mp3?alt=media&token=dbaa4ade-ef6c-405c-a8e0-0f9b841552f3',
  'https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FXw57QmOvYIfKARsPzPojXtYD9mu1%2F4-Lunita%20de%20Verano.mp3?alt=media&token=182b165c-c3aa-46b8-952e-18aed634f61c'
];

  var link = document.createElement('a');

  link.setAttribute('download', null);
  link.style.display = 'none';

  document.body.appendChild(link);

  for (var i = 0; i < links.length; i++) {
    link.setAttribute('href', links[i]);
    link.click();
  }

  document.body.removeChild(link);
}

 $scope.button ="http://img.viralpatel.net/2013/07/angularjs-routing-view-controller.png" ;

    $scope.fun = function(){
        angular.forEach($scope.linksZip,function(value,key){
            document.getElementById('id').click();
            $scope.button = value;
        });
      };
/**
 * Download a list of files.
 * @author speedplane
 */
$scope.download_files=function(files) {
     console.log(files);
     console.log($rootScope);
     console.log($window.document.title);
     console.log(document.head );
$window.document.head['Content-Disposition']='attachment';
$window.document.head['Content-Type']= 'application/mp3';
     console.log($window.document.head);
  function download_next(i) {
      console.log(i);
    if (i >= files.length) {
      return;
    }
    var a = document.createElement('a');
    a.href = files[i].download;
    // a.target = '_parent';
      // a.type="application/octet-stream"
    a.target = '_self';

    console.log(a);

    // Use a.download if available, it prevents plugins from opening.
    if ('download' in a) {
      console.log('download esta');

      a.download = files[i].filename;
    }

     // a.setAttribute('download', true);
  console.log(a);
    // Add a to the doc for click to work.
    (document.body || document.documentElement).appendChild(a);
    if (a.click) {
          console.log('a.click');
          // console.log(document.documentElement);
      // a.click(); // The click method is supported by most browsers.s
    } else {
       console.log('$(a).click()');
          // console.log(document.documentElement);
      $(a).click(); // Backup using jquery
    }
    // Delete the temporary link.
    a.parentNode.removeChild(a);
    // Download the next file with a small timeout. The timeout is necessary
    // for IE, which will otherwise only download the first file.
    setTimeout(function() {
      download_next(i + 1);
    }, 500);
  }
  // Initiate the first download.
  download_next(0);
}


$scope.compressed=function (tracks,nombre) {
         console.log(tracks);
         console.log(nombre);
  var zip = new JSZip();
  var count = 0;
  var name = nombre+".zip";
  tracks.forEach(function(track){
console.log(track);
// This can be downloaded directly:
  var xhr = new XMLHttpRequest();
  // xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
     console.log(event);
    var blob = xhr.response;

   console.log(blob);

    // JSZipUtils.getBinaryContent(url, function (err, data) {
    //   if(err) {
    //      throw err;
    //   }
       // zip.file(url, data,  {binary:true});
       zip.file(track.nombreArchivo, blob);
       count++;
       if (count == tracks.length) {
         zip.generateAsync({type:'blob'}).then(function(content) {
            // saveAs(content, name);
//trick to download store a file having its URL
            var fileURL = URL.createObjectURL(content);
            var a         = document.createElement('a');
            a.href        = fileURL;
            a.target      = '_blank';
            a.download    = name;
            document.body.appendChild(a);
            a.click();


         });
       };



  };
  xhr.open('GET', track.link);
  xhr.send();

  });
}

  }]);
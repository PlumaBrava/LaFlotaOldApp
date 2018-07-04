'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:LanzamientosdetallesCtrl
 * @description
 * # LanzamientosdetallesCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
  // .controller('LanzamientosdetallesCtrl', function () {
      .controller('LanzamientosdetallesCtrl', ['$scope','$state', '$stateParams','firebaseservice', '$translate','$uibModal','subirArchivo','subirarchivosong', 'spotiService',function ($scope,$state, $stateParams, fb,$translate,$uibModal,subirArchivo,subirarchivosong,spotiService) {
        console.log('LanzamientosdetallesCtrl');
var self=this;
   console.log('$stateParams');
    console.log($stateParams);
    $scope.errorAlbum={};
    $scope.progress=0;
  if($stateParams.lanzamiento){

    $scope.album={

        lanzamientoKey:$stateParams.lanzamiento.$id,
        CodigoISRC:$stateParams.lanzamiento.CodigoISRC,
        Composicion:$stateParams.lanzamiento.Composicion,
        GeneroPrincipal:$stateParams.lanzamiento.GeneroPrincipal,
        GeneroSecundarios:$stateParams.lanzamiento.GeneroSecundarios,
        Idioma:$stateParams.lanzamiento.Idioma,
        LetrasExplicitas: $stateParams.lanzamiento.LetrasExplicitas,
        Nombre: $stateParams.lanzamiento.Nombre,
        NumeroDeCanciones: $stateParams.lanzamiento.NumeroDeCanciones,
        PrecioEnTiendas: $stateParams.lanzamiento.PrecioEnTiendas,
        TieneCodigoISRC:$stateParams.lanzamiento.TieneCodigoISRC,
        arteURL:$stateParams.lanzamiento.arteURL,
        nombreArchivoArte: $stateParams.lanzamiento.nombreArchivoArte,
        tiendas:$stateParams.lanzamiento.tiendas,
        timestampCreacion:$stateParams.lanzamiento.timestampCreacion,
        Artista:$stateParams.lanzamiento.Artista,
        FechaDeLanzamiento:$stateParams.lanzamiento.FechaDeLanzamiento,

        user:$stateParams.lanzamiento.user


        };
     $scope.tracks=$stateParams.lanzamiento.tracks;
     $scope.SongFileDetalle=new Array(parseInt($stateParams.lanzamiento.NumeroDeCanciones, 10));
     $scope.progressSong=new Array(parseInt($stateParams.lanzamiento.NumeroDeCanciones, 10));
console.log( $scope.SongFileDetalle);

for(var i=0; i<$scope.tracks.length;i++){

      $scope.SongFileDetalle[i]={'name':$scope.tracks[i].nombreArchivo,
      'size':$scope.tracks[i].size,
      'type':$scope.tracks[i].type};

      $scope.progressSong[i]=0;
     }

} else {

    $scope.album={
        CodigoISRC:null,
        Composicion:null,
        FechaDeLanzamiento:null,
        GeneroPrincipal:null,
        GeneroSecundarios:null,
        Idioma:null,
        LetrasExplicitas: null,
        Nombre: null,
        NumeroDeCanciones:null,
        PrecioEnTiendas: null,
        TieneCodigoISRC:null,
        arteURL:null,
        nombreArchivoArte: null,
        tiendas:{ Amazon:true,
                  AppleMusic:true,
                  ClaroMusica:true,
                  GooglePlay:true,
                  MediaNet: true,
                  MicrosoftGroove:true,
                  Pandora:true,
                  Deezer:true,
                  Saavn:true,
                  Spotify:true,
                  Tidal:true,
                  YouTubeMusic:true,
                  iTunes:true },
        timestampCreacion:null,
        tracks:null,
         Artista:null,
        user:null

    };
}
$scope.getFileName=function(){
  console.log('getFileName');
}
  $scope.errorAlbum.Nombre="";
  $scope.errorAlbum.Arte="";
  $scope.errorAlbum.Tiendas="";
  $scope.errorAlbum.Tiendas="";
  $scope.errorAlbum.NumeroDeCanciones="";
  $scope.errorAlbum.Idioma="";
this.verificarLanzamiento=function(){
  var hayError=false;
  var Mensaje='';

  $scope.errorAlbum.Arte="";
  $scope.errorAlbum.Nombre="";
  $scope.errorAlbum.Arte="";
  $scope.errorAlbum.Tiendas="";

  $scope.errorAlbum.NumeroDeCanciones="";
  $scope.errorAlbum.Idioma="";
  $scope.errorAlbum.GeneroPrincipal="";
  $scope.errorAlbum.GeneroSecundarios="";
  $scope.errorAlbum.Composicion="";

  $scope.errorAlbum.LetrasExplicitas="";
  $scope.errorAlbum.PrecioEnTiendas="";
  $scope.errorAlbum.TieneCodigoISRC="";
  $scope.errorAlbum.CodigoISRC="";
  $scope.errorAlbum.Artista="";
  $scope.errorAlbum.FechaDeLanzamiento="";
  $scope.errorAlbum.Tracks="";



  if(!$scope.album.Nombre){
    $scope.errorAlbum.Nombre='errorAlbumNombre_';
    hayError=true;
    // Mensaje=Mensaje+' errorAlbumNombre_ '+'\n'
  };
  if(!$scope.album.arteURL){
     $scope.errorAlbum.Arte='errorAlbumArte_';
    hayError=true;
    // Mensaje=Mensaje+' errorAlbumArte_ '+'\n'
  };

   if(!$scope.album.tiendas.Amazon &&
      !$scope.album.tiendas.AppleMusic&&
      !$scope.album.tiendas.ClaroMusica&&
      !$scope.album.tiendas.GooglePlay&&
      !$scope.album.tiendas.MediaNet&&
      !$scope.album.tiendas.MicrosoftGroove&&
      !$scope.album.tiendas.Pandora&&
      !$scope.album.tiendas.Saavn&&
      !$scope.album.tiendas.Spotify&&
      !$scope.album.tiendas.Tidal&&
      !$scope.album.tiendas.YouTubeMusic&&
      !$scope.album.tiendas.iTunes){
    console.log("error Tiendas");
      $scope.errorAlbum.Tiendas='errorAlbumTienda_';
    hayError=true;
    // Mensaje=Mensaje+' errorAlbumArte_ '+'\n'
  };
console.log("$scope.album.NumeroDeCanciones");
console.log($scope.album.NumeroDeCanciones);
console.log($scope.album.Idioma);
  if(!$scope.album.NumeroDeCanciones){
    console.log("err $scope.album.NumeroDeCanciones");
    console.log($scope.album.NumeroDeCanciones);
      $scope.errorAlbum.NumeroDeCanciones='errorAlbumNumeroDeCanciones_';
    hayError=true;
    // Mensaje=Mensaje+' errorAlbumArte_ '+'\n'
  };
  if(!$scope.album.Idioma){
    $scope.errorAlbum.Idioma='errorAlbumIdioma_';
    hayError=true;
  };

  if(!$scope.album.GeneroPrincipal){
    $scope.errorAlbum.GeneroPrincipal='errorAlbumGeneroPrincipal_';
    hayError=true;
  };

  if(!$scope.album.GeneroSecundarios){
    $scope.errorAlbum.GeneroSecundarios='errorAlbumGeneroSecundarios_';
    hayError=true;
  };

  if(!$scope.album.Composicion){
    $scope.errorAlbum.Composicion='errorAlbumComposicion_';
    hayError=true;
  };


   if(!$scope.album.LetrasExplicitas){
    $scope.errorAlbum.LetrasExplicitas='errorAlbumLetrasExplicitas_';
    hayError=true;
  };


   if(!$scope.album.PrecioEnTiendas){
    $scope.errorAlbum.PrecioEnTiendas='errorAlbumPrecioEnTiendas_';
    hayError=true;
  };

   if(!$scope.album.TieneCodigoISRC){
    $scope.errorAlbum.TieneCodigoISRC='errorAlbumTieneCodigoISRC_';
    hayError=true;
  };

  if($scope.album.TieneCodigoISRC=='TengoCodigoISRC' && !$scope.album.CodigoISRC){

       $scope.errorAlbum.CodigoISRC='errorAlbumCodigoISRC_';
       hayError=true;

  };

 if(!$scope.album.Artista){
    $scope.errorAlbum.Artista='errorAlbumArtista_';
    hayError=true;
  };

  if(!$scope.album.FechaDeLanzamiento){
    $scope.errorAlbum.FechaDeLanzamiento='errorAlbumFechaDeLanzamiento_';
    hayError=true;
  };

  // if(!$scope.album.Tracks){
  //   $scope.errorAlbum.Tracks='errorAlbumTracks_';
  //   hayError=true;
  // };


  //       timestampCreacion:null,
  //       tracks:null,
  //        Artista:null,
  //       user:null};
  if(hayError){
  $scope.openModal('lg', 'MensajesDeError_',Mensaje);
  }
  return hayError;
};

fb.listarArtistaUsuario()
    .then(function(dato){
        console.log('listarArtistaUsuario',dato);
         $scope.listaArtistas=dato.result;
console.log('listarArtistaUsuario', $scope.listaArtistas);
         $scope.$apply(function () {});


    })
    .catch(function(error){
         console.log('error listarArtistaUsuario',error);
    });



$scope.grabarProducto = function(){
 console.log("grabarProducto " );
    console.log( $scope.producto);
    fb.grabarProducto($scope.producto.productoKey,$scope.producto);
};

 $scope.getSongFile = function (index) {
   console.log("getSongFile ", index );
 }
 $scope.getFile = function () {
     console.log("getFile " );
    console.log( $scope.file);
        $scope.progress = 0;
        subirArchivo.subirArchivo($scope.file, $scope,'LaFlotaImagenAlbum/'+ fb.getUsuario().uid)
                      .then(function(result) {
                        console.log('result Imagen');
                        console.log(result);
                          $scope.album.arteURL= result.downloadURL;
                          $scope.album.nombreArchivoArte = result.metadata.name;
                          $scope.okdisponible=true;
                      },function(result) {
                      console.log('error Imagen');
                      console.log(result);
                      });
};

 $scope.$on('fileProgress', function(e, progress) {
     console.log("fileProgress " );
     console.log(e );
     console.log(progress);
        $scope.progress = progress.loaded / progress.total;
   });
  $scope.$on('fileProgressSong', function(e, progress) {
     console.log("fileProgress " );
     console.log(e );
     console.log(progress);
        $scope.progressSong[progress.indice] = progress.loaded / progress.total;
   });
this.onChange = function onChange(fileList) {
    console.log("onChange");
    console.log(fileList);
    $ctrl.fileToUpload = fileList[0];
  };



$scope.uploadTrack=function(fileName,index){
  console.log('uploadTrack');
  console.log(fileName);
  console.log( $scope[fileName]);
  $scope.SongFileDetalle[index]=($scope[fileName]);
  $scope.progressSong[index]=0;
  $scope.tracks[index].size=$scope.SongFileDetalle[index].size;
  $scope.tracks[index].type=$scope.SongFileDetalle[index].type;

  console.log( $scope.SongFileDetalle[index]);
  console.log($scope);


 console.log(subirarchivosong);
subirarchivosong.subirArchivo( $scope.SongFileDetalle[index], $scope,'LaFlotaAudioUser/'+ fb.getUsuario().uid,index)
                      .then(function(result) {
                        console.log('result uploadTrack');
                        console.log(result);
                          $scope.tracks[index].link= result.downloadURL;
                           $scope.tracks[index].nombreArchivo = result.metadata.name;

                      },function(result) {
                      console.log('error uploadTrack');
                      console.log(result);
                      });

};





 $translate('current-text').then(function (current) {
     $scope.hoy = current;
  }, function (translationId) {
     $scope.hoy = translationId;
  });

 $translate('close-text').then(function (close) {
     $scope.close = close;
  }, function (translationId) {
     $scope.close = translationId;
  });

$translate('clear-text').then(function (clear) {
     $scope.clear = clear;
  }, function (translationId) {
     $scope.clear = translationId;
  });

$translate('Idioma_').then(function (dato) {
     $scope.idioma = dato;
  }, function (translationId) {
     $scope.clear = translationId;
  });

  $scope.Idiomas=['LANG_ES_AR','LANG_EN_US','LANG_DE_DE'];

  $scope.Generos=['GeneroAlternativeBigBand_',
    'GeneroBlues_',
    'GeneroChildrenMusic_',
    'GeneroChistainGospel_',
    'GeneroClassical_',
    'GeneroComedy_',
    'GeneroCountry_',
    'GeneroDance_',
    'GeneroElectronic_',
    'GeneroFitnessAndWorkout_',
    'GeneroFolk_',
    'GeneroFrenchPop_',
    'GeneroGermanPop_',
    'GeneroGermanFolk_',
    'GeneroHipHopRap_',
    'GeneroHoliday_',
    'GeneroJPop_',
    'GeneroJazz_',
    'GeneroKPop_',
    'GeneroLatin_',
    'GeneroLatinUrban_',
    'GeneroMetal_',
    'GeneroNewAge_',
    'GeneroPop_',
    'GeneroPunk_',
    'GeneroRandBandSoul_',
    'GeneroRock_',
    'GeneroSingerSongWriter_',
    'GeneroSoundTrack_',
    'GeneroSpokenWord_',
    'GeneroVocal_',
    'GeneroWord_'  ];
    $scope.numeroDeCanciones=['1 single', 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

  $scope.Composiciones=['ComposicionesAutor_','ComposicionesCover_'];
  $scope.LetrasExplicitasSiNO=['LetrasExplisitasSi_','LetrasExplisitasNo_'];
  $scope.PreciosEnTiendas=['Precio_0.69','Precio_0.99','Precio_1.29'];
  $scope.CodigosISRC=['TengoCodigoISRC','NoTengoCodigoISRC'];

   $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1,
    clear:'clear Juan'
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

  $scope.updateNumeroCanciones=function(numeroCanciones){
    console.log('updateNumeroCanciones',numeroCanciones);
    console.log('updateNumeroCanciones isArray(numeroCanciones)',angular.isArray(numeroCanciones));
    console.log('updateNumeroCanciones is Number',angular.isNumber(numeroCanciones));
    // console.log('updateNumeroCanciones is lenght',numeroCanciones.length);
if (numeroCanciones){
     $scope.tracks=new Array(parseInt(numeroCanciones, 10));
     $scope.SongFileDetalle=new Array(parseInt(numeroCanciones, 10));
     $scope.progressSong=new Array(parseInt(numeroCanciones, 10));
     console.log('updateNumeroCanciones',$scope.tracks);

     for(var i=0; i<$scope.tracks.length;i++){
      $scope.tracks[i]={'nombre':'','link':'','otos datos':'xx','index':i,'size':' ',type:' '};;
      $scope.SongFileDetalle[i]=i;
      $scope.progressSong[i]=0;
     }
     }
  }

$scope.grabarDetalleLanzamiento=function(){
 console.log('grabarDetalleLanzamiento');
 if(!self.verificarLanzamiento()){
    $scope.album.tracks=$scope.tracks;
   fb.grabarDetalleLanzamiento($scope.album.lanzamientoKey,$scope.album);
 };
};


$scope.getSpotifyToken=function(){
console.log('getSpotifyToken');

spotiService.getSpotifyToken();
};


$scope.getSpotifyArtista=function(artista){
  console.log('getSpotifyUser');
  console.log('artista',artista);

spotiService.getSpotifyArtista(artista);


};


$scope.openModal = function (size,titulo, mensaje) {
  console.log("openModal");
    var parentElem = null;
    // var parentElem = parentSelector ?
      // angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl:  'views/modallanzamientodetalle.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        titulo: function () {
          return titulo;
        },
        mensaje: function () {
          return mensaje;
        }
      }
    });


      modalInstance.result.then(function (returnedItem) {


        console.log('return:'+returnedItem);
        console.log(returnedItem);



        // // item.texto=returnedItem;
        // item.intervaloMs = returnedItem.intervaloMs;
        // item.volumen = returnedItem.volumen;
        // item.duracion = Number(returnedItem.duracion);
        // item.duracionHMS=fb.msToDHMSMS(returnedItem.duracion);
        // item.ascendente=returnedItem.ascendente;
        // item.tipoDigital=returnedItem.tipoDigital;
        // $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);

    }, function () {

        console.log('return dismissed:');

    });
};

$scope.openModalArtista = function (size,artista) {
  console.log("openModalArtista");
    var parentElem = null;
    // var parentElem = parentSelector ?
      // angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl:  'views/modalartistas.html',
      controller: 'ModalArtistaCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        // titulo: function () {
        //   return titulo;
        // },
        artista: function () {
          return artista;
        }
      }
    });


      modalInstance.result.then(function (returnedItem) {


        console.log('return:'+returnedItem);
        console.log(returnedItem);



        // // item.texto=returnedItem;
        // item.intervaloMs = returnedItem.intervaloMs;
        // item.volumen = returnedItem.volumen;
        // item.duracion = Number(returnedItem.duracion);
        // item.duracionHMS=fb.msToDHMSMS(returnedItem.duracion);
        // item.ascendente=returnedItem.ascendente;
        // item.tipoDigital=returnedItem.tipoDigital;
        // $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);

    }, function () {

        console.log('return dismissed: openModalArtista');

    });
};


  }])

 .controller('ModalInstanceCtrl', function ($uibModalInstance,titulo, mensaje,$translate) {
  var $ctrl = this;
  $ctrl.titulo = "titulo";
  $ctrl.mensaje = "mensaje";
  $ctrl.selected = {
    // item: $ctrl.items[0]
    item: mensaje
  };


$translate(titulo).then(function (dato) {
    console.log("modalTraduccion dato",dato);
    $ctrl.titulo= dato;
  }, function (translationId) {
    console.log("modalTraduccion no encontro",translationId);
     $ctrl.titulo = translationId;
  });

 $translate(mensaje).then(function (dato) {
    var parsed = angular.element("<div></div>");
   var textVersion = parsed.text(dato).html();
    console.log( textVersion);

    console.log("modalTraduccion dato",encodeURIComponent(dato));
    console.log( "modalTraduccion dato",decodeURIComponent(dato));
    console.log("modalTraduccion dato",dato);
     // $ctrl.mensaje=  unescape(dato);
     $ctrl.mensaje=   StringUTF8AsBytesArrayFromString(dato);
  }, function (translationId) {
     $ctrl.mensaje = translationId;
  });

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

//
// Convert JavaScript UCS2 string to array of bytes representing the string UTF8 encoded
//

var StringUTF8AsBytesArrayFromString=function ( s )
{

var symbolo=[
"\n\r ",
"À",
"Á",
"Â",
"Ã",
"Ä",
"Å",
"Æ",
"Ç",
"È",
"É",
"Ê",
"Ë",
"Ì",
"Í",
"Î",
"Ï",

"Ð",
"Ñ",
"Ò",
"Ó",
"Ô",
"Õ",
"Ö",
"×",
"Ø",
"Ù",
"Ú",
"Û",
"Ü",
"Ý",
"Þ",
"ß",


"à",
"á",
"â",
"ã",
"ä",
"å",
"æ",
"ç",
"è",
"é",
"ê",
"ë",
"ì",
"í",
"î",
"ï",
"ð",
"ñ",
"ò",
"ó",
"ô",
"õ",
"ö",
"÷",
"ø",
"ù",
"ú",
"û",
"ü",
"ý",
"þ",
"ÿ",

"–",
"—",
"‘",
"’",
"‚",
"“",
"”",
"„",
"†",
"‡",
"•",
"…",
"‰",
"€",
"™"

];


var codigo =[
"&#10;",
"&#192;",
"&#193;",
"&#194;",
"&#195;",
"&#196;",
"&#197;",
"&#198;",
"&#199;",
"&#200;",
"&#201;",
"&#202;",
"&#203;",
"&#204;",
"&#205;",
"&#206;",
"&#207;",

"&#208;",
"&#209;",
"&#210;",
"&#211;",
"&#212;",
"&#213;",
"&#214;",
"&#215;",
"&#216;",
"&#217;",
"&#218;",
"&#219;",
"&#220;",
"&#221;",
"&#222;",
"&#223;",

"&#224;",
"&#225;",
"&#226;",
"&#227;",
"&#228;",
"&#229;",
"&#230;",
"&#231;",
"&#232;",
"&#233;",
"&#234;",
"&#235;",
"&#236;",
"&#237;",
"&#238;",
"&#239;",
"&#240;",
"&#241;",
"&#242;",
"&#243;",
"&#244;",
"&#245;",
"&#246;",
"&#247;",
"&#248;",
"&#249;",
"&#250;",
"&#251;",
"&#252;",
"&#253;",
"&#254;",
"&#255;",


"&#8211;",
"&#8212;",
"&#8216;",
"&#8217;",
"&#8218;",
"&#8220;",
"&#8221;",
"&#8222;",
"&#8224;",
"&#8225;",
"&#8226;",
"&#8230;",
"&#8240;",
"&#8364;",
"&#8482;",
];

  console.log("modalTraduccion trad",s);
  for(var i=0;i<codigo.length;i++){
  // var a=  '/'+codigo[i]+'/g';
  var   regex = new RegExp(codigo[i], "g");
   console.log("modalTraduccion trad",regex+" - "+symbolo[i]);
  s = s.replace(regex , symbolo[i]); //  la bara g -> reemplazo global en todo el string
  console.log("modalTraduccion trad",s);
  };
  return s;
};




})
 .controller('ModalArtistaCtrl', function ($uibModalInstance,artista,$translate,firebaseservice,$scope,subirArchivo,spotiService) {
  var $ctrl = this;
  // $ctrl.titulo = "titulo";
  // $ctrl.mensaje = "mensaje";
  $ctrl.selected = {
    // item: $ctrl.items[0]
    // item: mensaje
    item: ""
  };
  $ctrl.artista={
    nombre:artista.nombre,
    redSocial:artista.redSocial,
    linkDNI:artista.linkDNI,
    id:artista.$id
  };

 console.log("ModalArtistaCtrl artista",artista);
// $translate(titulo).then(function (dato) {
//     console.log("modalTraduccion dato",dato);
//     $ctrl.titulo= dato;
//   }, function (translationId) {
//     console.log("modalTraduccion no encontro",translationId);
//      $ctrl.titulo = translationId;
//   });

//  $translate(mensaje).then(function (dato) {
//     var parsed = angular.element("<div></div>");
//    var textVersion = parsed.text(dato).html();
//     console.log( textVersion);

//     console.log("ModalArtistaCtrl dato",encodeURIComponent(dato));
//     console.log( "ModalArtistaCtrl dato",decodeURIComponent(dato));
//     console.log("mModalArtistaCtrl dato",dato);
//      // $ctrl.mensaje=  unescape(dato);
//      // $ctrl.mensaje=   StringUTF8AsBytesArrayFromString(dato);
//   }, function (translationId) {
//      $ctrl.mensaje = translationId;
//   });

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


 $ctrl.agregarArtista= function(artista) {
  // artista.linkDNI="https://firebasestorage.googleapis.com/v0/b/laflota-19ada.appspot.com/o/LaFlotaAudioUser%2FLyL1uhXJUmgitP3HBLvJfVblZLB2%2FDSC05391-14-2.jpg?alt=media&token=e8d1a606-fc3e-42dd-bdad-48506d919e4b";
   console.log('agregarArtista ',artista);
  firebaseservice.agregarArtista(artista)
  .then(function(dato){
   console.log('agregarArtista',dato);
  $uibModalInstance.dismiss('cancel');
  })
    .catch(function(error){
         console.log('error agregarArtista',error);
    });
};

// if(!spotiService.isSpotifyReady()){
// spotiService.inicializaSpotify().then(
//   function(r){
//   console.log('inicializado ok Spotify: ' );
//   // accessToken=spotiService.getSpotifyAccessTocken();
//   // self.spotifyUserId=spotiService.getSpotifyUserID();
//   });
// };

$ctrl.getSpotifyUser=function(artista){
  console.log('getSpotifyUser');

spotiService.inicializaSpotifyLaFlota();


}


firebaseservice.listarArtistaUsuario()
    .then(function(dato){
        console.log('listarArtistaUsuario',dato);
         $scope.listaArtistas=dato.result;
console.log('listarArtistaUsuario', $ctrl.listaArtistas);
         $scope.$apply(function () {});


    })
    .catch(function(error){
         console.log('error listarArtistaUsuario',error);
    });

 $scope.$on('fileProgress', function(e, progress) {
     console.log("fileProgress " );
     console.log(e );
     console.log(progress);
        $scope.progress = progress.loaded / progress.total;
   });

 $scope.getFile = function () {
     console.log("getFile " );
    console.log( $scope.file);
        $scope.progress = 0;
        subirArchivo.subirArchivo($scope.file, $scope,'LaFlotaDNIusuario/'+ firebaseservice.getUsuario().uid)
                      .then(function(result) {
                        console.log('result Imagen');
                        console.log(result);
                           $ctrl.artista.linkDNI= result.downloadURL;

                      },function(result) {
                      console.log('error Imagen');
                      console.log(result);
                      });
};

});


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
      .controller('LanzamientosdetallesCtrl', ['$scope','$state','firebaseservice', '$translate','$uibModal','subirArchivo', function ($scope,$state,fb,$translate,$uibModal,subirArchivo) {
        console.log('LanzamientosdetallesCtrl');




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
        subirArchivo.subirArchivo($scope.file, $scope,'LaFlotaImagenAlbum/'+ fb.getUser().uid)
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
this.onChange = function onChange(fileList) {
    console.log("onChange");
    console.log(fileList);
    $ctrl.fileToUpload = fileList[0];
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
     console.log('updateNumeroCanciones',$scope.tracks);

     for(var i=0; i<$scope.tracks.length;i++){
      $scope.tracks[i]={'nombre':'Nombre del tema','link':'link123','otos datos':'xx'};;

     }
     }
  }

$scope.grabarDetalleLanzamiento=function(){
 console.log('grabarDetalleLanzamiento');
    $scope.album.tracks=$scope.tracks;
   fb.grabarDetalleLanzamiento('',$scope.album);
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


$scope.openTickModal = function (size, item) {

    var parentElem = null;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_tick.html',
      controller: 'ModalInstanceTick',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {


        console.log('return:'+returnedItem);
        console.log(returnedItem);
        console.log(item);


        // item.texto=returnedItem;
        item.intervaloMs = returnedItem.intervaloMs;
        item.volumen = returnedItem.volumen;
        item.duracion = Number(returnedItem.duracion);
        item.duracionHMS=fb.msToDHMSMS(returnedItem.duracion);
        item.ascendente=returnedItem.ascendente;
        item.tipoDigital=returnedItem.tipoDigital;
        $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);

    }, function () {

        console.log('return dismissed:');
      // $log.info('Modal dismissed at: ' + new Date());
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




});


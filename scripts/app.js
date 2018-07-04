'use strict';

/**
 * @ngdoc overview
 * @name laFlotaApp
 * @description
 * # laFlotaApp
 *
 * Main module of the application.
 */
angular
  .module('laFlotaApp', ['ui.router','firebase','ngStorage','pascalprecht.translate','ngCookies','ngSanitize','ui.bootstrap'])
  .config(['$stateProvider','$urlRouterProvider',  function($stateProvider,$urlRouterProvider ){



$urlRouterProvider.rule(function ($injector, $location) {

       //what this function returns will be set as the $location.url
        var path = $location.path(), normalized = path.toLowerCase();
        console.log('$urlRouterProvider');
        console.log($injector);
        console.log('path: '+path);
        console.log('-'+path+'-');
        console.log('path nomalized :'+normalized);
        console.log($location);
        console.log($location.url());
         // $location.url('/spotifycallback/'+$location.url().replace('#','?'));


          console.log($location.url().indexOf('access_token')); // -1 si no le encuenta, de lo contrario da el lugar en el array
          console.log($location.url().indexOf('token_type')); // -1 si no le encuenta, de lo contrario da el lugar en el array
          console.log($location.url().indexOf('expires_in')); // -1 si no le encuenta, de lo contrario da el lugar en el array

          if(path==='' && $location.url().indexOf('access_token')!==-1 && $location.url().indexOf('token_type')!==-1 && $location.url().indexOf('expires_in'))
            {
              console.log('cambio URL spotifycallback');
              $location.url('/spotifycallback'+$location.url().replace('#','?'));
            // $location.replace().path('/spotifycallback/');
        }


        console.log(normalized);
        if (path !== normalized) {
        //     //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
        //     // $location.replace().path(normalized);
        }
        // because we've returned nothing, no state change occurs
    });
$stateProvider
.state('spotifycallback',{
    // url:'/spotifycallback/',
    // url:'/spotifycallback/?access_token&token_type&expires_in',
    url:'/spotifycallback?access_token&token_type&expires_in',
    templateUrl:'views/spotifycallback.html',
    resolve: {
    'urlFix': ['$location', function($location){
      console.log(' resolve');
      console.log($location.url());
        // $location.url($location.url().replace('#','?'));
     }]
   },
    controller:'SpotifycallbackCtrl as sp'
});

// $urlRouterProvider.otherwise('/');
$stateProvider
.state('home',{
    url:'/',
    templateUrl:'views/main.html',
    controller:'MainCtrl as main'
});

$stateProvider
.state('quienessomos',{
    url:'/quienessomos',
    templateUrl:'views/quienessomos.html',
     controller:'MainCtrl as main'
});


$stateProvider
.state('preguntasfrecuentes',{
    url:'/preguntasfrecuentes',
    templateUrl:'views/preguntasfrecuentes.html',
     controller:'MainCtrl as main'
});

$stateProvider
.state('usuariosperfiles',{
    url:'/usuariosPerfiles',
    templateUrl:'views/usuariosperfiles.html',
     controller:'UsuariosperfilesCtrl as UsuariosperfilesCtrl'
});

$stateProvider
.state('configuracionadministrador',{
    url:'/configuracionadministrador',
    templateUrl:'views/configuracionadministrador.html',
     controller:'ConfiguracionusuarioadministradorCtrl as configuracionadministradorCtrl'
});

$stateProvider
.state('consultas',{
    url:'/consultas',
    templateUrl:'views/consultas.html',
     controller:'ConsultasCtrl as consultas'
});

$stateProvider
.state('consultasrespuestas',{
    url:'/consultasrespuestas',
    templateUrl:'views/consultasrespuestas.html',
     controller:'ConsutlasrespuestasCtrl as Consutlasrespuestas'
});


$stateProvider
.state('login',{
    url:'/login',
    templateUrl:'views/login.html',
     controller:'LoginCtrl as login'
});

$stateProvider
.state('configuracionusuario',{
    url:'/configuracionusuario',
      params: {
            pagando: null

        },
    templateUrl:'views/configuracionusuario.html',
     controller:'ConfiguracionusuarioCtrl as configuracionusuario'
});

$stateProvider
.state('pago',{
    url:'/pago',
    templateUrl:'views/pago.html',
     controller:'PagoCtrl as pago'
});

$stateProvider
.state('producto',{
    url:'/producto',
    params: {
            producto: null

        },
    templateUrl:'views/productos.html',
     controller:'ProductoCtrl as productoCtrl'
});

$stateProvider
.state('productoslistado',{
    url:'/productosListado',
    templateUrl:'views/productoslistado.html',
     controller:'ProductoslistadoCtrl as productoListadosCtrl'
});

$stateProvider
.state('landing',{
    url:'/landing',
    templateUrl:'views/landing.html',
     controller:'ProductoslandingCtrl as productoslanding'
});


$stateProvider
.state('mislanzamientos',{
    url:'/mislanzamientos',
    templateUrl:'views/mislanzamientos.html',
     controller:'MislanzamientosCtrl as mislanzamientosdetalles'
});


$stateProvider
.state('lanzamientodetalle',{
    url:'/lanzamientodetalle',
     params: {
            lanzamiento: null

        },
    templateUrl:'views/lanzamientodetalle.html',
     controller:'LanzamientosdetallesCtrl as lanzamientosdetalles'
});


$stateProvider
.state('miscompras',{
    url:'/miscompras',
    templateUrl:'views/miscompras.html',
     controller:'MiscomprasCtrl as miscomprascontroller'
});

$stateProvider
.state('comprasrealizadas',{
    url:'/comprasrealizadas',
    templateUrl:'views/comprasrealizadas.html',
     controller:'ComprasrealizadasCtrl as comprasrealizadascontroller'
});

$stateProvider
.state('misplanesvigentes',{
    url:'/misplanesvigentes',
    templateUrl:'views/misplanesvigentes.html',
     controller:'MisplanesvigentesCtrl as misplanesvigentescontroller'
});


$stateProvider
.state('lanzamientospendientes',{
    url:'/lanzamientospendientesdetalle',
    templateUrl:'views/lanzamientospendientes.html',
     controller:'LanzamientosPendientesCtrl as lanzamientospendientes'
});


$stateProvider
.state('bonos',{
    url:'/bonos',
      params: {
            bono: null

        },
    templateUrl:'views/bonos.html',
     controller:'BonosCtrl as bonosCtrl'
});


$stateProvider
.state('listadobonos',{
    url:'/listadobonos',
    templateUrl:'views/listadobonos.html',
     controller:'ListadobonosCtrl as Listadobonos'
});


// mercado Pago. listado de Pagos realizados.
$stateProvider
.state('listadopagos',{
    url:'/listadopagos',
    templateUrl:'views/listadopagos.html',
     controller:'ListadopagosCtrl as listadopagos'
});

$stateProvider
    .state("otherwise", { url : '/'});

  }]).config( function(){


 // var config = {
 //    apiKey: "AIzaSyATFHPOvPIszswYY0tCgJ06rlyQ24WHDCA",
 //    authDomain: "logistica-144918.firebaseapp.com",
 //    databaseURL: "https://logistica-144918.firebaseio.com",
 //    projectId: "logistica-144918",
 //    storageBucket: "logistica-144918.appspot.com",
 //    messagingSenderId: "378485183737"
 //  };
 var config = {
    apiKey: "AIzaSyDPkDlE2JP3iSiQ6Fzl8dAZanwNwFaVJDI",
    authDomain: "laflota-19ada.firebaseapp.com",
    databaseURL: "https://laflota-19ada.firebaseio.com",
    projectId: "laflota-19ada",
    storageBucket: "laflota-19ada.appspot.com",
    messagingSenderId: "615365712454"
  };
  firebase.initializeApp(config);
    })



.config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    console.log($translateProvider);

 var language = (window.navigator.userLanguage || window.navigator.language).toLowerCase();
    console.log(language);
    $translateProvider.registerAvailableLanguageKeys(['de_DE', 'en_US','es_AR'], {
    'en_US': 'en_US',
    'en_UK': 'en_US',
    'en': 'en_US',
    'de': 'de_DE',
    'es': 'sp_AR',
    'es_AR': 'sp_AR'
    });


    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/lang_',
      suffix: '.json'
    });


    $translateProvider.preferredLanguage('es_AR');
    $translateProvider.useCookieStorage();
    $translateProvider.fallbackLanguage("es_AR");
});

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
    templateUrl:'views/productosListado.html',
     controller:'ProductoslistadoCtrl as productoListadosCtrl'
});

$stateProvider
.state('landing',{
    url:'/landing',
    templateUrl:'views/landing.html',
     controller:'ProductoslandingCtrl as productoslanding'
});

$stateProvider
.state('lanzamientodetalle',{
    url:'/lanzamientodetalle',
    templateUrl:'views/lanzamientodetalle.html',
     controller:'LanzamientosdetallesCtrl as lanzamientosdetalles'
});

$stateProvider
.state('lanzamientospendientes',{
    url:'/lanzamientospendientesdetalle',
    templateUrl:'views/lanzamientospendientes.html',
     controller:'LanzamientosPendientesCtrl as lanzamientospendientes'
});

$stateProvider
    .state("otherwise", { url : '/'});

  }]).config( function(){


 var config = {
    apiKey: "AIzaSyATFHPOvPIszswYY0tCgJ06rlyQ24WHDCA",
    authDomain: "logistica-144918.firebaseapp.com",
    databaseURL: "https://logistica-144918.firebaseio.com",
    projectId: "logistica-144918",
    storageBucket: "logistica-144918.appspot.com",
    messagingSenderId: "378485183737"
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

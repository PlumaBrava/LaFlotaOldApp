'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ProductoCtrl
 * @description
 * # ProductoCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
.controller('ProductoCtrl', ['$scope','$state','firebaseservice', 'subirArchivo',  '$stateParams', function ($scope,$state,fb,subirArchivo, $stateParams) {
var self =this;
 $scope.progress = 0;
   console.log('$stateParams');
    console.log($stateParams);
  if($stateParams.producto){

    $scope.producto={
        productoKey:$stateParams.producto.$id,
        NombredelProducto:$stateParams.producto.NombredelProducto,
        DescripciondelProducto:$stateParams.producto.DescripciondelProducto,
        fotoLinkdelProducto:$stateParams.producto.fotoLinkdelProducto,
        fotoNameLinkdelProducto:$stateParams.producto.fotoNameLinkdelProducto,
        PaisdelProducto:$stateParams.producto.PaisdelProducto,
        MonedadelProducto:$stateParams.producto.MonedadelProducto,
        MontodelProducto:$stateParams.producto.MontodelProducto,
        CanitidadAlbumsdelProducto:$stateParams.producto.CanitidadAlbumsdelProducto,
        CandidDeArtistasIncluidosdelProducto:$stateParams.producto.CandidDeArtistasIncluidosdelProducto,
        DuraciondelProducto:$stateParams.producto.DuraciondelProducto,
        AceptaBonificacionesdelProducto:$stateParams.producto.AceptaBonificacionesdelProducto,
        LandingdelProducto:$stateParams.producto.LandingdelProducto,
        PlanSugeridodelProducto:$stateParams.producto.PlanSugeridodelProducto

        };
} else {

    $scope.producto={
        productoKey:null,
        NombredelProducto:'Nombre del Producto',
        DescripciondelProducto:'Descripcion del Producto',
        fotoLinkdelProducto:'images/solounalbum-180x180.jpg',
        fotoNameLinkdelProducto:'solounalbum-180x180.jpg',
        PaisdelProducto:'ARG',
        MonedadelProducto:'ARS',
        MontodelProducto:0.0,
        CanitidadAlbumsdelProducto:1,
        CandidDeArtistasIncluidosdelProducto:1,
        DuraciondelProducto:'VigenciaVitaliciadelProducto',
        AceptaBonificacionesdelProducto:false,
        LandingdelProducto:false,
        PlanSugeridodelProducto:''

    };
}


$scope.paises= [
'ARG',
'CHL',
'BRA',
'URU',
'PRY',
'DEU'
];

$scope.monedas=[

'ARS',
'CLP',
'BRL',
'UYU',
'PYG',
'EUR'
];

$scope.$watch(function() {
  return $scope.producto;
}, function(newValue, oldValue) {
    console.log("change producto detected: " + newValue);
    console.log( newValue);
  });

$scope.muestraProducto = function(){
 console.log("muestraProducto " );
    console.log( $scope);
    console.log( $scope.productoForm);
    console.log( $scope.productoForm.fotoLinkdelProducto);
    console.log( $scope.productoForm.fotoLinkdelProducto.$viewValue);
    // console.log( $scope.upload-file-info);

};

$scope.grabarProducto = function(){
 console.log("grabarProducto " );
    console.log( $scope.producto);
if(self.losDatosDelProductoSonCorrectos()){



    fb.grabarProducto($scope.producto.productoKey,$scope.producto);
       $state.go('productoslistado');
        }
};
this.losDatosDelProductoSonCorrectos=function(){
  return true;
};
 $scope.getFile = function () {
     console.log("getFile " );
    console.log( $scope.file);
        $scope.progress = 0;
        subirArchivo.subirArchivo($scope.file, $scope,'LaFlotaImagenProductos')
                      .then(function(result) {
                        console.log('result Imagen');
                        console.log(result);
                          $scope.producto.fotoLinkdelProducto = result.downloadURL;
                          $scope.producto.fotoNameLinkdelProducto = result.metadata.name;
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
    $ctrl.fileToUpload = fileList[0];};
  }]);

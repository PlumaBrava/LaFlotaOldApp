'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ConfiguracionusuarioCtrl
 * @description
 * # ConfiguracionusuarioCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
  .controller('ConfiguracionusuarioCtrl', ['$scope','$state', '$stateParams','firebaseservice', '$translate','$uibModal','subirArchivo','subirarchivosong', function ($scope,$state, $stateParams, fb,$translate,$uibModal,subirArchivo,subirarchivosong) {
        console.log('ConfiguracionusuarioCtrl');

$scope.user=fb.getUsuario();
console.log($scope.user);


$scope.paises= [
'ARG',
'CHL',
'BRA',
'URU',
'PRY',
'DEU'
];

$scope.provincias=[
'AR-B',
'AR-C',
'AR-K',
'AR-H',
'AR-U',
'AR-X',
'AR-W',
'AR-E',
'AR-P',
'AR-Y',
'AR-L',
'AR-F',
'AR-M',
'AR-N',
'AR-Q',
'AR-R',
'AR-A',
'AR-J',
'AR-D',
'AR-Z',
'AR-S',
'AR-G',
'AR-V',
'AR-T'
];

$scope.guardarConfiguracion=function(){
    console.log('guardarConfiguracion');
    console.log($scope.configuracion);
    $scope.configuracion.email=fb.getUsuario().email;
    fb.configuracionUsuario($scope.configuracion).then(function(dato){
      console.log('guardarConfiguracion ok',dato);
      if($stateParams.pagando){
       $state.go('pago');
     }
   }).catch(function(error){
          console.log('guardarConfiguracion error',error);

   });
};

$scope.openModalArtista = function (size,artista) {
  console.log("openModalArtista");
  console.log(artista);
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






fb.listarArtistaUsuario()
  .then(function(dato){
      console.log('listarArtistaUsuario',dato);
      $scope.listaArtistas=dato.result;
      console.log('listarArtistaUsuario', $scope.listaArtistas);
      $scope.$apply(function () {});
  }).catch(function(error){
      console.log('error listarArtistaUsuario',error);
  });

fb.leerConfiguracionUsuario()
    .then(function(dato){
        console.log('leerConfiguracionUsuario',dato);
         $scope.configuracion=dato.result.configuracion;
        console.log('leerConfiguracionUsuario',  $scope.configuracion);
         $scope.$apply(function () {});
    })
    .catch(function(error){
         console.log('error leerConfiguracionUsuario',error);
    });
}]);


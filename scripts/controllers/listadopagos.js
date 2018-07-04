'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ListadopagosCtrl
 * @description
 * # ListadopagosCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')

     .controller('ListadopagosCtrl', ['$scope','$localStorage','$http','firebaseservice',function ( $scope,$localStorage,$http,fb) {
// // Chekout Personalizado
// var PUBLIC_KEY='TEST-c7ca9bb8-3dbb-4f81-a6dc-9413a6707a56';
// var ACCESS_TOCKEN= 'TEST-7455599808952903-122715-70dde9ce42ec91a1b1731e9dae3d3875__LA_LD__-19679536';

// // Check out basico
// var CLIENT_ID= 7455599808952903;
// var CLIENT_SECRET= 'vuoWxzb0KyFKHXCL10RAiq70jQAzp8F7';

  // Mercadopago.setPublishableKey(PUBLIC_KEY);


// $scope.paging={limit:30,offset:370,total:383};



$scope.bigTotalItems=0;
$scope.bigCurrentPage=0;
$scope.maxSize=30;

// Simple GET request example:
var headers = {

                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : 'POST, GET ,PUT , DELETE , OPTIONS',
            };

// busca todos los pagos realizados
$scope.listadoPagos=function(){




$http({
  method: 'GET',
  url: 'https://us-central1-laflota-19ada.cloudfunctions.net/getPagos',
  headers: headers,
  params: {'offset':$scope.maxSize*$scope.bigCurrentPage}

}).then(function successCallback(response) {
     console.log('search successCallback');
       console.log(response);

$scope.bigTotalItems=response.data.body.paging.total;
// $scope.bigCurrentPage=$scope.paging.offset/$scope.maxSize;
 console.log(response.data.body.paging);
$scope.pagos=response.data.body.results;
 console.log($scope.pagos);


  }, function errorCallback(response) {
     console.log('search errorCallback');
     console.log(response);

  });

}
$scope.listadoPagos();


  }]);

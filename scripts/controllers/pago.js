'use strict';

// <!-- Aplicación: 19679536 - MercadoPago application (mp-app-19679536)

angular.module('laFlotaApp')
  .controller('PagoCtrl', ['$scope','$localStorage','$http', function ( $scope,$localStorage,$http) {

        console.log('PagoCtrl');
var self=this;


// https://www.mercadopago.com/mla/account/credentials?type=basic

// Aplicación: 19679536 - MercadoPago application (mp-app-19679536)

// Chekout Personalizado
var PUBLIC_KEY='TEST-c7ca9bb8-3dbb-4f81-a6dc-9413a6707a56';
var ACCESS_TOCKEN= 'TEST-7455599808952903-122715-70dde9ce42ec91a1b1731e9dae3d3875__LA_LD__-19679536';

// Check out basico
var CLIENT_ID= 7455599808952903;
var CLIENT_SECRET= 'vuoWxzb0KyFKHXCL10RAiq70jQAzp8F7';

  Mercadopago.setPublishableKey(PUBLIC_KEY);


// Simple GET request example:
var headers = {

                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : 'POST, GET ,PUT , DELETE , OPTIONS',
                // 'Accept': 'application/json',
                // 'Accept-Charset': 'utf-8'
// 'Content-Type': 'application/json'
// 'Connection': 'keep-alive',
// 'Origin': 'chrome-extension:', //rest-console-id
// 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
            };


/// retoran los  Datos de un determinado Método  de pago. (OK)
var object = {'payment_method_id': 'rapipago'};
Mercadopago.getPaymentMethod(object, function(error,paymentMethodHandler)
{
    console.log('paymentMethodHandler');
     console.log(error);
     console.log(paymentMethodHandler);

}
    );


/// retornan los metodos de pagos disponibles. (OK)
$http({
  method: 'GET',
  url: 'https://api.mercadopago.com/v1/payment_methods?public_key='+PUBLIC_KEY,
   contentType:"application/json; charset=utf-8",
  dataType:"json",
   headers: headers
 //  ,
 // headers: {
 //   'Accept': 'application/json',
 //    'Content-Type': 'application/json'
 //    }

}).then(function successCallback(response) {
     console.log('payment_methods successCallback');
       console.log(response);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
     console.log('payment_methods errorCallback');
     console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });



// Mercadopago.getIdentificationTypes();
// Mercadopago.getIdentificationTypes(function(id){
//       console.log('idTypes',id);
//       console.log(id);
// });


/// conigue un tocken ID para hacer un pago con tarjeta (OK)
//   No funcona con el parametro 'Access-Control-Allow-Origin': '*',

$http({
  method: 'POST',
  url: 'https://api.mercadopago.com/v1/card_tokens?public_key='+PUBLIC_KEY,
   contentType:"application/json; charset=utf-8",
  dataType:"json"
  // ,
  //  headers: headers
 //  ,
 // headers: {
 //   'Accept': 'application/json',
 //    'Content-Type': 'application/json'
 //    }

}).then(function successCallback(response) {
     console.log('card_tokens successCallback');
       console.log(response);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
     console.log('card_tokens errorCallback');
     console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

// tipos de documentos premitidos (OK)

$http({
  method: 'GET',
  url: 'https://api.mercadopago.com/v1/identification_types?access_token='+ACCESS_TOCKEN,
   contentType:"application/json; charset=utf-8",
  dataType:"json",
   headers: headers
 //  ,
 // headers: {
 //   'Accept': 'application/json',
 //    'Content-Type': 'application/json'
 //    }

}).then(function successCallback(response) {
     console.log('identification_types successCallback');
       console.log(response);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
     console.log('identification_types errorCallback');
     console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });





var monto=100.12;

console.log('float' , monto);
console.log('float' , parseFloat(monto));

var pago={


       // 'currency_id': "BRL",
        'transaction_amount' : parseFloat(monto) ,
        'description': 'Title of what you are paying for',

        'payer':{
            'email': 'perez.juan.jose1@gmail.com'
        },
        // 'payment_method_id': 'pagofacil',
        'payment_method_id': 'rapipago',
        'external_reference':'ref1',
        'description':'Payment reason or item title'


        // 'payment_type_id': 'ticket',
        // 'live_mode':false

    };





//Con esto trae los tipos de monedas
//https://api.mercadopago.com/currencies/?site_id=19679536#json


// pago mediante pagoFacil o rapipago
var pagarConPagoFacil=function(){

$http({
  method: 'POST',
  url: 'https://api.mercadopago.com/v1/payments?access_token='+ACCESS_TOCKEN,
  //  contentType:"application/json; charset=utf-8",
  // dataType:"json",
   data: pago,
   headers: headers



}).then(function successCallback(response) {
     console.log('payments successCallback');
       console.log(response);


// transaction_details{external_resource_url:'aca esta el link para imprimir'}






  }, function errorCallback(response) {
     console.log('payments errorCallback');
     console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

};


//  estado de la cuenta
// https://api.mercadopago.com/users/TU_ID_DE_USUARIO/mercadopago_account/balance?access_token=TU_TOKEN_DE_ACCESO


Mercadopago.getInstallments({
        "payment_method_id":"rapipago",
        "amount": 100
    }, function (status, response){
           console.log('getInstallments');
           console.log(status);
        console.log(response);
    });



var tarjetaParaID={

      'cardNumber':"4509953566233704",
      'paymentMethodId':'visa',
      'expirationYear':'2019',
      'expirationMonth':'7',
      'lastFourDigits':'3704',
      'securityCode':'123',
      'cardholder':{
        'identification':{
          'number':'12123123',
          'type':'DNI'

        },
        'name':'Pedro'
      }

    };



//Busca un tocken para pagar con tarjeta
$http({
  method: 'POST',
  url: 'https://api.mercadopago.com/v1/card_tokens?public_key='+PUBLIC_KEY,
   contentType:"application/json; charset=utf-8",
  dataType:"json",
   data: tarjetaParaID
   // headers: headers



}).then(function successCallback(response) {
     console.log('card_tokens successCallback');
       console.log(response);

 console.log('card_tokens response.data.id '+response.data.id);
pagoConTarjeta(response.data.id);






  }, function errorCallback(response) {
     console.log('card_tokens errorCallback');
     console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });



// busca todos los pagos realizados
$http({
  method: 'GET',
  url: 'https://api.mercadopago.com/v1/payments/search?access_token='+ACCESS_TOCKEN,
  //  contentType:"application/json; charset=utf-8",
  // dataType:"json",
   data: tarjetaParaID,
   headers: headers



}).then(function successCallback(response) {
     console.log('search successCallback');
       console.log(response);


// transaction_details{external_resource_url:'aca esta el link para imprimir'}






  }, function errorCallback(response) {
     console.log('search errorCallback');
     console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });


var pagoConTarjeta=function(id){
       console.log('pagoConTarjeta '+id);
  var pagotarjeta={


       // 'currency_id': "BRL",
        'transaction_amount' : 15.50 ,
        'token': id,
        'description': 'Ejemplo de pago con tajeta',
        "installments": 1,

         'payment_method_id': 'visa',
        'external_reference':'ref externa pago con tarjeta',
        // 'operation_type':'regular_payment',




    "payer": {
      "email": "perez.juan.jose1@gmail.com",
      'identification':{
        'type':'DNI',
        'number':'12123123'
          },
      'first_name':'Pedro',
      'last_name':'Rodriguez'
  },
  // 'statement_descriptor':'LaFlota.com Plan 1'

    };
      // 'card':{
      //   'id':'4509953566233704',
      //   'last_four_digits':'',
      //   'first_six_digits':'',
      //   'expiration_year':'',
      //   'expiration_month':'',
      //   'cardholder':'',
      //   'name':'',
      //   'identification':'',
      //   'number':'',
      //   'type':'',
      //   '':'',
      // }






// pago mediante pagoFacil o rapipago
$http({
  method: 'POST',
  url: 'https://api.mercadopago.com/v1/payments?access_token='+ACCESS_TOCKEN,
  //  contentType:"application/json; charset=utf-8",
  // dataType:"json",
   data: pagotarjeta,
   headers: headers



}).then(function successCallback(response) {
     console.log('pagoConTarjeta successCallback');
       console.log(response);

  }, function errorCallback(response) {
     console.log('pagoConTarjeta errorCallback');
     console.log(response);

  });


}


  }]);






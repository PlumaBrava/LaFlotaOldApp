'use strict';

angular.module('laFlotaApp')
  .controller('PagoCtrl', ['$scope','$localStorage','$http','firebaseservice','$state','$uibModal',function ( $scope,$localStorage,$http,fb,$state,$uibModal) {

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

$scope.avancedelacompra=new Array(4);
$scope.montoDescuento=0;

$scope.setAvancedelacompra=function(avance){

  console.log('setAvancedelacompra');
  console.log(avance);
  console.log($scope.avancedelacompra);

  switch(avance) {

  case 'confirmarCompra':
        $scope.avancedelacompra[0]='active';
        $scope.avancedelacompra[1]='';
        $scope.avancedelacompra[2]='';
        $scope.avancedelacompra[3]='';
        break;


    case 'compraConfirmada':
        $scope.avancedelacompra[0]='done';
        $scope.avancedelacompra[1]='active';
        $scope.avancedelacompra[2]='';
        $scope.avancedelacompra[3]='';
        break;

    case 'confirmarFactura':
        $scope.avancedelacompra[0]='done';
        $scope.avancedelacompra[1]='done';
        $scope.avancedelacompra[2]='active';
        $scope.avancedelacompra[3]='';
        break;

    case 'pagar':
        $scope.avancedelacompra[0]='done';
        $scope.avancedelacompra[1]='done';
        $scope.avancedelacompra[2]='done';
        $scope.avancedelacompra[3]='active';
        break;

    case 'pagoConfirmado':
        $scope.avancedelacompra[0]='done';
        $scope.avancedelacompra[1]='done';
        $scope.avancedelacompra[2]='done';
        $scope.avancedelacompra[3]='done';
        break;


    default:
        $scope.avancedelacompra[0]='';
        $scope.avancedelacompra[1]='';
        $scope.avancedelacompra[2]='';
        $scope.avancedelacompra[3]='';
}
  // $scope.$apply(function () {});
};

$scope.setAvancedelacompra('confirmarCompra');
Mercadopago.setPublishableKey(PUBLIC_KEY);
$scope.ErrorccNumber="nada0";
$scope.ErrorNameOnCard="nada1"
 $scope.errorMercadoPago={message: "sin error"};  // mensaje de error en la comunicacion con Mercado Pago.
// Simple GET request example:
var headers = {

                // 'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': 'https://laflota-19ada.firebaseapp.com',
                'Access-Control-Allow-Methods' : 'POST, GET ,PUT , DELETE , OPTIONS',

            };



/// retornan los metodos de pagos disponibles. (OK)
$http({
  method: 'GET',
  url: 'https://api.mercadopago.com/v1/payment_methods?public_key='+PUBLIC_KEY,
  contentType:"application/json; charset=utf-8",
  dataType:"json",
  headers: headers})
  .then(function successCallback(response) {
    console.log('payment_methods successCallback');
    console.log(response);
    $scope.metodosDePago=response.data;
    //Tipos de MetodosDePago, se usa para filtrar los tipos de pagos disponibles.
    $scope.TiposDeMetodosDePago =  (Array.from(new Set($scope.metodosDePago.map(function(a) {return a.payment_type_id;})))).sort();
    console.log($scope.TiposDeMetodosDePago);

  }, function errorCallback(response) {
     console.log('payment_methods errorCallback');
     console.log(response);
      $scope.errorMercadoPago=response.data;
  });



// tipos de documentos premitidos (OK)

$http({
  method: 'GET',
  url: 'https://api.mercadopago.com/v1/identification_types?public_key='+PUBLIC_KEY,
  contentType:"application/json; charset=utf-8",
  dataType:"json",
  headers: headers

}).then(function successCallback(response) {
     console.log('identification_types successCallback');
       console.log(response);
        $scope.tiposIdentificaciona=response.data;
        console.log($scope.tiposIdentificaciona);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
     console.log('identification_types errorCallback');
     console.log(response);
     $scope.errorMercadoPago=response.data;
  });


// verifica que la identificación tenga la longitud apropiada.

$scope.verificaNroIdentificacion=function( tipoIdentificacionSeleccionada,nroIdentificacion ){
  console.log('verificaNroIdentificacion');
  console.log(nroIdentificacion.length);
  $scope.nroIdentificacionError='';
  $scope.ErrorNroIdentificacion='';

  if(isNaN(nroIdentificacion)){
    $scope.playSound();
    $scope.nroIdentificacion=$scope.nroIdentificacion.substring(0, $scope.nroIdentificacion.length - 1);
    $scope.nroIdentificacionError="Ingresen Nro ";
    return;
  } else {
    for(var i=0;i<$scope.tiposIdentificaciona.length;i++){
      if($scope.tiposIdentificaciona[i].id==tipoIdentificacionSeleccionada){
        if(nroIdentificacion.length<=$scope.tiposIdentificaciona[i].max_length&&nroIdentificacion.length>=$scope.tiposIdentificaciona[i].min_length){
          $scope.nroIdentificacionError="";//Correcto
        } else {
          $scope.nroIdentificacionError="La Identificacion debe tener entre" +$scope.tiposIdentificaciona[i].min_length +" y "+$scope.tiposIdentificaciona[i].max_length+ " digitos.";
        }
      }
    }
    console.log(nroIdentificacion);
  }
};

// en funcion del combo tipo metodo de pago, selecciona los metodos de pago
// ej.  si eleijo ticket seleccion rapipago, pago facil, etc.
//      si elijo tarjeta visa, master , etc.

$scope.seleccionatiposDeMetodosDePago=function(){
  console.log('seleccionaMetodoDePago');
  console.log("-"+$scope.tiposDeMetodosDePagoSeleccionado+"-");
  console.log($scope.metodosDePago);
  var tempMetodoPagoSeleccionado=$scope.metodosDePago.map(function(a) {
    // map aplica esta funcion a cada elemento del array. Retorna el metodo de pago
    // si es igual al seleccionado o null si no los es.
      console.log('seleccionaMetodoDePago' ,a)
      if($scope.tiposDeMetodosId==null){

      if(a.payment_type_id==$scope.tiposDeMetodosDePagoSeleccionado){
        console.log('seleccionaMetodoDePago ==' , a.payment_type_id)
        return a;
      } else {
        console.log('seleccionaMetodoDePago <>' , a.payment_type_id)
        return null;}
      } else // $scope.tiposDeMetodosId!=null {
        if(a.payment_type_id==$scope.tiposDeMetodosDePagoSeleccionado&&a.id==$scope.tiposDeMetodosId){
        console.log('seleccionaMetodoDePago and id ==' , a.payment_type_id )
        return a;
      } else {
        console.log('seleccionaMetodoDePago and id <>' , a.payment_type_id)
        return null;}

    }
  );
 console.log( tempMetodoPagoSeleccionado);
  // con esto se eliminan los null
  $scope.metodosDePagoSeleccionados=tempMetodoPagoSeleccionado.filter(function(e){return e});;
  console.log( $scope.metodosDePagoSeleccionados);
};

$scope.seleccionaDeMetodosDePago=function(metodoDePagoSeleccionado){
  console.log('seleccionaDeMetodosDePago');
  console.log(metodoDePagoSeleccionado);
       $scope.metodoDePagoSeleccionado=metodoDePagoSeleccionado;


};

// ejecuta un sonido almacenado en un TAG del html.
$scope.playSound= function () {
          var sound = document.getElementById("audio");
          sound.play();
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

// Verifica si hay cuotas disponibles
$scope.getCuotas= function(bin){
Mercadopago.getInstallments({

        "bin": bin,
        "amount": $scope.MontoCompra
    }, function (status, response){
           console.log('getInstallments');
           console.log(status);
        console.log(response);
        $scope.cuotas=response;

    });
};

// con los 6 primeros dítos de la tarjeta determina que tarjeta  y con setPaymentMethod. Determina el metodo de pago.
// esto lo usaremos para cuando no es ticket o atm.
$scope.guessingPaymentMethod =function (cardNumber) {
   console.log("guessingPaymentMethod "+cardNumber);
   console.log(cardNumber);
   console.log($scope.ccNumber);

   if(!cardNumber){
    return;
   };

   if(isNaN(cardNumber)||!/^[0-9]+$/.test(cardNumber)){
    $scope.playSound();
    $scope.ccNumber=$scope.ccNumber.substring(0, $scope.ccNumber.length - 1);
    $scope.ErrorccNumber="Ingresen solo Numeros sin espacios ";
    return;
    };

    if($scope.metodoDePagoSeleccionado){
       console.log("metodoDePagoSeleccionado");
       console.log($scope.metodoDePagoSeleccionado);
      if( $scope.ccNumber.length>$scope.metodoDePagoSeleccionado.settings[0].card_number.length){
         $scope.playSound();
        $scope.ccNumber=$scope.ccNumber.substring(0, $scope.ccNumber.length - 1);
        $scope.ErrorccNumber="Ingresó más de "+$scope.metodoDePagoSeleccionado.settings[0].card_number.length+" digitos.";
      return;
      }
    };
     var bin =  cardNumber.slice(0, 6);

        if (bin.length >= 6) {
          $scope.getCuotas(bin);
            Mercadopago.getPaymentMethod({
                "bin": bin
            }, $scope.setPaymentMethodInfo);
        }



};

$scope. setPaymentMethodInfo=function(status, response) {
    console.log("guessingPaymentMethod "+status);
    console.log("guessingPaymentMethod ",response);
    if (status == 200) {

      $scope.tiposDeMetodosDePagoSeleccionado=response[0].payment_type_id;
      $scope.tiposDeMetodosId=response[0].id;
      $scope.seleccionatiposDeMetodosDePago();
      $scope.metodoDePagoSeleccionado=response[0];


    }
};


$scope.verificarNameOnCard =function (nameOnCard){
  // if(!nameOnCard){
  //   return;
  //  };

  //  if(isNaN(cardNumber)||!/^[0-9]+$/.test(cardNumber)){
  //   $scope.playSound();
  //   $scope.ccNumber=$scope.ccNumber.substring(0, $scope.ccNumber.length - 1);
  //   $scope.ErrorccNumber="Ingresen solo Numeros sin espacios ";
  //   return;
  //   };

  //   if($scope.metodoDePagoSeleccionado){
  //      console.log("metodoDePagoSeleccionado");
  //      console.log($scope.metodoDePagoSeleccionado);
  //     if( $scope.ccNumber.length>$scope.metodoDePagoSeleccionado.settings[0].card_number.length){
  //        $scope.playSound();
  //       $scope.ccNumber=$scope.ccNumber.substring(0, $scope.ccNumber.length - 1);
  //       $scope.ErrorccNumber="Ingresó más de "+$scope.metodoDePagoSeleccionado.settings[0].card_number.length+" digitos.";
  //     return;
  // $scope.ErrorExpirationYear="Correcto";
  //     }
}
$scope.verificarExpirationMonth =function (expirationMonth) {
  console.log("verificarExpirationMonth");
  console.log(expirationMonth);
  if(!expirationMonth){
    $scope.ErrorExpirationMonth="Complete la mes ";
    return false;
   };

   if(isNaN(expirationMonth)||!/^[0-9]+$/.test(expirationMonth)){
    $scope.playSound();
    $scope.expirationMonth=$scope.expirationMonth.substring(0, $scope.expirationMonth.length - 1);
    $scope.ErrorExpirationMonth="Ingresen solo Numeros sin espacios ";
    return false;
    };

    if(expirationMonth>12 ||expirationMonth<1){
    $scope.playSound();
    $scope.ErrorExpirationMonth="Ingrese un Numero del 01 al 12 ";
    return false;
      }
      $scope.ErrorExpirationMonth="Correcto";
      return true;
};
$scope.verificarExpirationYear =function (expirationYear) {
   console.log("expirationYear");
  console.log(expirationYear);
  if(!expirationYear){
    $scope.ErrorExpirationYear="Complete el año ";
    return false;
   };

   if(isNaN(expirationYear)||!/^[0-9]+$/.test(expirationYear)){
    $scope.playSound();
    $scope.expirationYear=$scope.expirationYear.substring(0, $scope.expirationYear.length - 1);
    $scope.ErrorExpirationYear="Ingresen solo Numeros sin espacios ";
    return false;
    };

    if(expirationYear>100||expirationYear<18){
    $scope.playSound();
    $scope.ErrorExpirationYear="Ingrese un año válidos ";
    return false;
      }
      $scope.ErrorExpirationYear="Correcto";
      return true;
}
$scope.verificarSecurityCode =function (securityCode) {
   console.log("verificarSecurityCode");
  console.log(securityCode);
  if(!securityCode){
    $scope.ErrorSecurityCode="Complete el código ";
    return false;
   };

   if(isNaN(securityCode)||!/^[0-9]+$/.test(securityCode)){
    $scope.playSound();
    $scope.securityCode=$scope.securityCode.substring(0, $scope.securityCode.length - 1);
    $scope.ErrorSecurityCode="Ingresen solo Numeros sin espacios ";
    return false;
    };
 console.log($scope.metodoDePagoSeleccionado);
    if($scope.metodoDePagoSeleccionado){
       console.log("verificarSecurityCode metodoDePagoSeleccionado");
       console.log($scope.metodoDePagoSeleccionado);
      if( $scope.securityCode.length>$scope.metodoDePagoSeleccionado.settings[0].security_code
.length){
         $scope.playSound();
        $scope.securityCode=$scope.securityCode.substring(0, $scope.securityCode.length - 1);
        $scope.ErrorSecurityCode="Ingresó más de "+$scope.metodoDePagoSeleccionado.settings[0].security_code
.length+" digitos.";
      return;
      }
    };

$scope.ErrorSecurityCode="Correcto";
      return true;
}




$scope.setCuotaSeleccionada=function(cuotaDetalle,coutaSeleccionada){
  console.log("setCuotaSeleccionada");
  console.log(cuotaDetalle);
  console.log(coutaSeleccionada);
  console.log( cuotaDetalle.payer_costs);
  $scope.cuotaDetalle=cuotaDetalle,
   cuotaDetalle.payer_costs.forEach(function(c){
      console.log(c.recommended_message);
      if(c.recommended_message==coutaSeleccionada){
          console.log("coutaSeleccionada");
          console.log(coutaSeleccionada);
          $scope.cuotaSeleccionada=c;

      }

    });


};
$scope.metodoDePagoSeleccionado=null;
$scope.tipoIdentificacionSeleccionada=null;
$scope.nroIdentificacion=null;
$scope.ErrorCuotas='';
$scope.verificarFormularioPago=function(){
    $scope.ErrormetodoDePagoSeleccionado='';
    $scope.ErrorTipoIdentificacionSeleccionada='';
    $scope.ErrorCuotas='';
    $scope.openModal('sm','titulo','Detalle');
   console.log('verificarFormulario');
   if($scope.metodoDePagoSeleccionado==null){
         $scope.ErrormetodoDePagoSeleccionado="ErrorMetodoDePago_";
      }
     if($scope.tipoIdentificacionSeleccionada==null){
         $scope.ErrorTipoIdentificacionSeleccionada="ErrorTipoIdentificacionSeleccionada_";
      }
     if($scope.nroIdentificacion==null){
         console.log('verificarFormulario nroIdentificacion null');
        $scope.ErrorNroIdentificacion="ErrorNumeroIdentificion_";

      }
     if($scope.tipoIdentificacionSeleccionada==null){
         $scope.ErrorTipoIdentificacionSeleccionada="ErrorTipoIdentificacionSeleccionada_";
      }
      if($scope.cuotaSeleccionada==null){
        $scope.ErrorCuotas="ErrorCuotaSeleccionada_";
      }
      else if($scope.ccNumber==123){}
      // else if($scope.cuotaDetalle.payment_method_id==null){}
      else if($scope.expirationYear==null){}
      else if($scope.expirationMonth==null){}
      else if($scope.securityCode==null){}
      else if($scope.securityCode==null){}





};


//Busca un tocken para pagar con tarjeta
$scope. checkOut=function(){
// $scope.setAvancedelacompra('pagar');
console.log('checkOut');
console.log($scope.metodoDePagoSeleccionado.payment_type_id);

if($scope.metodoDePagoSeleccionado.payment_type_id=="credit_card"||
  $scope.metodoDePagoSeleccionado.payment_type_id=="debit_card"){

$scope.tarjetaParaTocken={

      'cardNumber':$scope.ccNumber,
      'paymentMethodId': $scope.cuotaSeleccionada.payment_method_id,
      'expirationYear':parseInt($scope.expirationYear, 10)+2000,
      'expirationMonth':$scope.expirationMonth,
      'lastFourDigits':$scope.ccNumber.substring($scope.securityCode.length-5, $scope.securityCode.length - 1),
      'securityCode':$scope.securityCode,
      'cardholder':{
        'identification':{
          'number':$scope.nroIdentificacion,
          'type':$scope.tipoIdentificacionSeleccionada

        },
        'name':$scope.nameOnCard
      },

    };

      console.log($scope.tarjetaParaTocken);
  $http({
    method: 'POST',
    url: 'https://api.mercadopago.com/v1/card_tokens?public_key='+PUBLIC_KEY,
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    data:  $scope.tarjetaParaTocken
    }).then(function successCallback(response) {
       console.log('card_tokens successCallback');
       console.log(response);
       console.log('card_tokens response.data.id '+response.data.id);
       $scope.cobrarConTarjeta(response.data.id);
       $scope.setAvancedelacompra('pagoConfirmado');

  }, function errorCallback(response) {
     console.log('card_tokens errorCallback');
     console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

} else if($scope.metodoDePagoSeleccionado.payment_type_id=="ticket"){
  $scope.cobrarConTicket();
  }

};


$scope.cobrarConTarjeta=function(id){
  console.log("cobrarConTarjeta");
      console.log('cobrarConTarjeta '+id);
  var pagotarjeta={
      // 'currency_id': "ARS",
      'transaction_amount' : $scope.cuotaSeleccionada. total_amount,
      'description': 'Ejemplo de pago con tajeta',//razón de pago o Título
      'installments': $scope.cuotaSeleccionada.installments,//cuotas
      'issuer_id':$scope.cuotaDetalle.issuer.id,//identificador del emisor del medio de pago (banco emisor de la tarjeta)
      'payment_method_id': $scope.metodoDePagoSeleccionado.id,
      'external_reference':$scope.compraKey, // referencia en el sistema del vendedor
      'description':'regular_payment',
      // 'operation_type':'regular_payment',
      'token':id,
      'payer': {
        'email': $scope.configuracion.email,
        'identification':{
            'number':$scope.nroIdentificacion,
            'type':$scope.tipoIdentificacionSeleccionada
            },
        // 'phone':{
        //   'area_code':'011',
        //   'number':'12123123',
        //   'extension':'12123123'
        //   },
      'first_name':$scope.configuracion.Nombre,
      'last_name':$scope.configuracion.Apellido,
    },

    'statement_descriptor':'LaFlota.com'//Cómo aparecerá el pago en el resumen de tarjeta (ej.: MERCADOPAGO).

    };

   var req = {
        method: 'post',
        url: 'https://us-central1-laflota-19ada.cloudfunctions.net/cobrar',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'},
         data: {'pago':pagotarjeta}
      };
      console.log("getAccessToken construye http req");

  $http(req)
      .then(function (response) {
        console.log('getAccessToken Respuesta', response);

        })
      .catch( function (error) {
          console.log('getAccessToken', error);

      });


};

$scope.cobrarConTicket=function(){
  console.log("cobrarConTicket");
  console.log("cobrarConTicket $scope.MontoCompra",$scope.MontoCompra);

  var ticket={
      // 'currency_id': "ARS",
      'transaction_amount' :parseFloat( $scope.MontoCompra),
      'description': 'Ejemplo de pago con ticket',//razón de pago o Título
      'installments': 1,//cuotas
      // 'issuer_id':null,//identificador del emisor del medio de pago (banco emisor de la tarjeta)
      'payment_method_id': $scope.metodoDePagoSeleccionado.id,
      'external_reference':$scope.compraKey, // referencia en el sistema del vendedor
      'description':'regular_payment',
      // 'operation_type':'regular_payment',
      // 'token':null,
      'payer': {
        'email': $scope.configuracion.email,
        'identification':{
            'number':$scope.nroIdentificacion,
            'type':$scope.tipoIdentificacionSeleccionada
            },
        // 'phone':{
        //   'area_code':'011',
        //   'number':'12123123',
        //   'extension':'12123123'
        //   },
      'first_name':$scope.configuracion.Nombre,
      'last_name':$scope.configuracion.Apellido,
    },

    'statement_descriptor':'LaFlota.com'//Cómo aparecerá el pago en el resumen de tarjeta (ej.: MERCADOPAGO).

    };

   var req = {
        method: 'post',
        url: 'https://us-central1-laflota-19ada.cloudfunctions.net/cobrar',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'},
         data: {'pago':ticket}
      };
      console.log("getAccessToken construye http req");

  $http(req)
      .then(function (response) {
        console.log('cobrarConTicket Respuesta', response);
         $scope.grabarDatosDePago(response);
          $scope.openModal('sm','ConTicketCobroRealizado_',response);
        })
      .catch( function (error) {
          console.log('cobrarConTicket', error);
          $scope.openModal('sm','ErrorAlCobrarConTicket_',error.data);
      });


};

// Confirma la compra del Chanquito
// La saca del carrito, le asigna una clave y la copia en Compras y UsuarioCompras.
//

  $scope.confirmarCompra=function(){
    console.log('confirmarCompra');
    console.log($scope.listaCompras);
    var compra={};
    compra['lista']=$scope.listaCompras;
    if($scope.promoCode){
    compra['bono']=$scope.promoCode;
    compra['bono']['montoDescuento']=$scope.montoDescuento;
    }
    compra['monto']=$scope.MontoCompra;
    compra['estado']='confirmada';
    compra['usuario']={'userKey':fb.getUsuario().uid,'userMail':fb.getUsuario().email};
    console.log(compra);
    fb.confirmarCompra(compra)
      .then(function(dato){
        console.log('confirmarCompra',dato);
       $scope.compraKey=dato.compraKey;
      $scope.setAvancedelacompra('compraConfirmada');
        $scope.$apply(function () {});
      })
      .catch(function(error){
        console.log('error confirmarCompra',error);
    });
  };

 $scope.grabarDatosDePago=function(datos){
    console.log('confirmarCompra');
    console.log(datos);
    console.log(datos.data);
    var pago={};
    pago['id']=datos.data.body.id;
    pago['barcode']=datos.data.body.barcode;
    pago['payment_method_id']=datos.data.body.payment_method_id;
    pago['payment_type_id']=datos.data.body.payment_type_id;
    pago['estado']=datos.data.body.status;
    pago['status_detail']=datos.data.body.status_detail;
    pago['external_resource_url']=datos.data.body.transaction_details.external_resource_url;


    console.log(pago);
    fb.grabarDatosDePago(pago,$scope.compraKey,$scope.listaCompras)
      .then(function(dato){
        console.log('grabarDatosDePago ok',dato);

      // $scope.setAvancedelacompra('compraConfirmada');
        $scope.$apply(function () {});
      })
      .catch(function(error){
        console.log('error grabarDatosDePago',error);
    });
  };


// Cancela una compra del chaguito de compras.

  $scope.cancelarCompra=function(compra){
    console.log('cancelarCompra');
    console.log(compra);

    fb.cancelarCompra(compra)
      .then(function(dato){
        console.log('cancelarCompra',dato);
         $scope.calcularMontodeCompra();
        // $scope.MontoCompra=0;
        // for(var i=0;i<$scope.listaCompras.length;i++){
        //   $scope.MontoCompra=parseFloat(parseFloat($scope.MontoCompra)+parseFloat($scope.listaCompras[i].producto.MontodelProducto)).toFixed(2);
        // };
        // $scope.$apply(function () {});
      })
      .catch(function(error){
        console.log('error cancelarCompra',error);
    });
  };


// Verifica y aplica Bono.
$scope.promoCode=null;
$scope.verificaAplicaBono=function(codigoBono){
    console.log('verificaAplicaBono');
    console.log(codigoBono);
    $scope.promoCode=null;
    $scope.errorBono="";
    fb.buscarBono(codigoBono)
      .then(function(dato){
        $scope.promoCode=dato.result;
        console.log('verificaAplicaBono',dato);
        console.log($scope.promoCode);



        if(!$scope.promoCode.Codigo ){ // Verifica si Existe el bono
          $scope.promoCode=null;
           $scope.errorBono="BonoNoExiste_";
        } else{

                var sePuedeAplicarElBonoAlPlan=false;
                var Hoy = new Date();//Fecha actual del sistema
                var FInicio = new Date($scope.promoCode.FechaInicio);//Fecha actual del sistema
                var FFin = new Date($scope.promoCode.FechaFin);//Fecha actual del sistema
                Hoy.setHours(0,0,0,0);
                FInicio.setHours(0,0,0,0);
                FFin.setHours(0,0,0,0);
                  // Verifica si Está relacionado un plan comprado

                console.log($scope.promoCode.AsociadoAPlan=='aplicaATodoslosPlanes_')  ;
                if($scope.promoCode.AsociadoAPlan=='aplicaATodoslosPlanes_') {
                  sePuedeAplicarElBonoAlPlan=true;
                }
                  console.log("comparo lista")   ;
                  console.log($scope.listaCompras)   ;
                  console.log($scope.listaCompras.length)   ;
                        for(var i=0;i<$scope.listaCompras.length;i++){
                          console.log(i)   ;
                          console.log($scope.promoCode.AsociadoAPlan)   ;
                          console.log($scope.listaCompras[i].producto.NombredelProducto)   ;
                        console.log($scope.promoCode.AsociadoAPlan==$scope.listaCompras[i].producto.NombredelProducto)   ;
                          if($scope.promoCode.AsociadoAPlan==$scope.listaCompras[i].producto.NombredelProducto){
                        console.log('sePuedeAplicarElBonoAlPlan',sePuedeAplicarElBonoAlPlan)   ;
                            sePuedeAplicarElBonoAlPlan=true;
                            break ;
                          }
                        };


                console.log(' final sePuedeAplicarElBonoAlPlan',sePuedeAplicarElBonoAlPlan)   ;
                if(!sePuedeAplicarElBonoAlPlan){
                  $scope.errorBono='ErrorLaPromocionAsociadaAOtroProducto_';
                } else{


                  //Verificación de las fechas
                    console.log("comparo fechas")   ;
                    console.log(Hoy.getTime()<FInicio.getTime())   ;
                    console.log(FFin.getTime()< Hoy.getTime())   ;

                  if(Hoy.getTime()<FInicio.getTime() ){
                    $scope.errorBono='ErrorLaPromocionNoComenzo_';
                  } else if(FFin.getTime()< Hoy.getTime()){
                      $scope.errorBono='ErrorLaPromocionYaTermino_';
                  }else{

                  console.log('disponibilidad');
                  console.log($scope.promoCode.CantidadMaxima);
                  console.log($scope.promoCode.CantidadAplicada);
                  console.log($scope.promoCode.CantidadMaxima==$scope.promoCode.CantidadAplicada);
                // Verifica si hay disponibilidad de bonos y graba el consumo de uno.
                if($scope.promoCode.CantidadMaxima==$scope.promoCode.CantidadAplicada){
                   $scope.errorBono='ErrorSeConsumieronTodosLosBonos_';
                } else {
                fb.consumirBono($scope.promoCode.$id).then(function(a){
                  console.log('resupuesta consumirBono');
                  console.log(a.snapshot.val());
                  console.log($scope.promoCode.TipoDescuento);
                  console.log($scope.promoCode.TipoDescuento);
                  console.log($scope.MontoCompra);

                  //Aplica el descuento por monto Fijo o Porcentaje

                  // if($scope.promoCode.TipoDescuento=='montoFijo_'){
                  //   $scope.montoDescuento=parseFloat($scope.promoCode.Monto).toFixed(2);
                  //   $scope.MontoCompra=parseFloat(parseFloat($scope.MontoCompra)- parseFloat($scope.montoDescuento)).toFixed(2);
                  // }else if($scope.promoCode.TipoDescuento=='porcentaje_'){
                  //   console.log($scope.promoCode.Porcentaje/100);
                  //   console.log(parseFloat($scope.promoCode.Porcentaje/100).toFixed(2));
                  //   $scope.montoDescuento=($scope.promoCode.Porcentaje/100)*$scope.MontoCompra;
                  //   $scope.MontoCompra=(1-$scope.promoCode.Porcentaje/100)*$scope.MontoCompra;
                  // }
                  fb.aplicarBono($scope.promoCode).then(function(data){
                     $scope.calcularMontodeCompra();
                  });
                   // $scope.$apply(function () {});
                });
              }
            }
            }

              }

       })

      .catch(function(error){
        $scope.errorBono="BonoNoExiste_";
        console.log('error cancelarCompra',error);
    });
  };

$scope.cancelarBono=function(bono){
console.log(bono);
    if(bono){
      fb.restituirBono(bono.Codigo).then(function(result){
        console.log('exito cancelarBono',result);

        fb.cancelarBono().then(function(result){
        console.log('exito cancelarBono',result);

         $scope.promoCode=null;
         $scope.montoDescuento=null;
          $scope.calcularMontodeCompra();
         // $scope.$apply(function () {});
      })
        .catch(function(error){
        $scope.errorBono="BonoErrorAlCancelar_";
        console.log('error cancelarBono',error);
    });
      })
      .catch(function(error){
        $scope.errorBono="BonoErrorAlRestituir_";
        console.log('error cancelarBono',error);
    });

    }
};

  // Listado de compras del carrito.

  fb.listarCarrito()
      .then(function(dato){
          console.log('listarCarrito',dato);
          console.log(dato);

          $scope.listaCompras=dato.result;

          console.log('listarCarrito compraKey',$scope.compraKey);
          console.log('listarCarrito',$scope.listaCompras.$ref);

          console.log('listarCarrito',$scope.listaCompras);
          $scope.calcularMontodeCompra();


      })
      .catch(function(error){
           console.log('error listarCarrito',error);
      });


$scope.calcularMontodeCompra=function(){
          $scope.MontoCompra=0;
         console.log('calcularMontodeCompra',$scope.listaCompras.length);
          for(var i=$scope.listaCompras.length-1;i>=0;i--){
              console.log('calcularMontodeCompra',$scope.listaCompras[i].$id);
          console.log('calcularMontodeCompra',$scope.listaCompras[i].$id);
            switch ($scope.listaCompras[i].$id){
              case 'bono':
               $scope.promoCode=$scope.listaCompras[i];
               $scope.listaCompras.splice(i, 1);//i posicion donde remuevo, 1 la cantidad que quito.
              break;

              case 'estado':
              console.log('calcularMontodeCompra estado',i);
              $scope.listaCompras.splice(i, 1);//i posicion donde remuevo, 1 la cantidad que quito.
              break;

              case 'compraKey':
              console.log('calcularMontodeCompra compraKey',i);
              if($scope.avancedelacompra[2]!='done'){ // ya se confirmó la factura
              $scope.setAvancedelacompra('compraConfirmada');
              }
              $scope.compraKey=$scope.listaCompras[i].$value;
              $scope.listaCompras.splice(i, 1);//i posicion donde remuevo, 1 la cantidad que quito.
              break;

              case 'datosFacturacion':
              console.log('calcularMontodeCompra datosFacturacion',i);
              $scope.setAvancedelacompra('pagar');
              $scope.listaCompras.splice(i, 1);//i posicion donde remuevo, 1 la cantidad que quito.
              break;
              default:
              $scope.MontoCompra=parseFloat(parseFloat($scope.MontoCompra)+parseFloat($scope.listaCompras[i].producto.MontodelProducto)).toFixed(2);
            }
          // if($scope.listaCompras[i].$id!='bono'){
          // $scope.MontoCompra=parseFloat(parseFloat($scope.MontoCompra)+parseFloat($scope.listaCompras[i].producto.MontodelProducto)).toFixed(2);
          // }else{
          //   // Saco el bono de la lista de compras y lo guardo en promoCode
          //   $scope.promoCode=$scope.listaCompras[i];
          //   $scope.listaCompras.splice(i, 1);//i posicion donde remuevo, 1 la cantidad que quito.
          // };
        }

        //Aplica el descuento por monto Fijo o Porcentaje
              if($scope.promoCode){
                  if($scope.promoCode.TipoDescuento=='montoFijo_'){
                    $scope.montoDescuento=parseFloat($scope.promoCode.Monto).toFixed(2);
                    $scope.MontoCompra=parseFloat(parseFloat($scope.MontoCompra)- parseFloat($scope.montoDescuento)).toFixed(2);
                  }else if($scope.promoCode.TipoDescuento=='porcentaje_'){
                    console.log($scope.promoCode.Porcentaje/100);
                    console.log(parseFloat($scope.promoCode.Porcentaje/100).toFixed(2));
                    $scope.montoDescuento=($scope.promoCode.Porcentaje/100)*$scope.MontoCompra;
                    $scope.MontoCompra=(1-$scope.promoCode.Porcentaje/100)*$scope.MontoCompra;
                  }
              }
          // $scope.$apply(function () {});

}

$scope.verificarDatosDeFacturacion=function(){
       console.log('verificarDatosDeFacturacion',$scope.configuracion);
 $scope.configuracionError={}
 $scope.pasaVerificacionDeFacturacion=true;

 if(! $scope.configuracion || ! $scope.configuracion.email){
   $scope.configuracionError.email="errorConfiguraciónMail_";
   $scope.pasaVerificacionDeFacturacion=false;
 }
 if(! $scope.configuracion || ! $scope.configuracion.Nombre){
   $scope.configuracionError.Nombre="errorConfiguraciónNombre_";
   $scope.pasaVerificacionDeFacturacion=false;
 }
 if(! $scope.configuracion || !$scope.configuracion.Pais){
   $scope.configuracionError.Pais="errorConfiguraciónPais_";
   $scope.pasaVerificacionDeFacturacion=false;
 }
 if(! $scope.configuracion || !$scope.configuracion.provincia){
   $scope.configuracionError.provincia="errorConfiguraciónPais_";
   $scope.pasaVerificacionDeFacturacion=false;
 }
 if(! $scope.configuracion || !$scope.configuracion.Apellido){
   $scope.configuracionError.Apellido="errorConfiguraciónApellido_";
   $scope.pasaVerificacionDeFacturacion=false;
 }
 if(! $scope.configuracion || !$scope.configuracion.Direccion1){
   $scope.configuracionError.Direccion1="errorConfiguraciónDireccion1_";
   $scope.pasaVerificacionDeFacturacion=false;
 }
 if(! $scope.configuracion || !$scope.configuracion.Direccion2){
    $scope.configuracionError.Direccion2="errorConfiguraciónDireccion2_";
    $scope.pasaVerificacionDeFacturacion=false;
 }
 if(! $scope.configuracion || !$scope.configuracion.codigoPostal){
   $scope.configuracionError.codigoPostal="errorConfiguraciónCodigoPostal_";
   $scope.pasaVerificacionDeFacturacion=false;
 }
 if(! $scope.configuracion || !$scope.configuracion.cuit){
    $scope.configuracionError.cuit="errorConfiguraciónCuit_";
    $scope.pasaVerificacionDeFacturacion=false;
  }

  return  $scope.pasaVerificacionDeFacturacion;
}

$scope.confirmarFacturacion= function(){
     console.log('confirmarFacturacion');
if($scope.verificarDatosDeFacturacion){
  fb.confirmarFacturacion($scope.configuracion,$scope.compraKey)
  .then(function(dato){
        console.log('ok confirmarFacturacion',dato);

    $scope.setAvancedelacompra('confirmarFactura');
    $scope.calcularMontodeCompra();
     // $scope.$apply(function () {});
      })
      .catch(function(error){
           console.log('error confirmarFacturacion',error);
      });
  };
};

$scope.modificarDatosDeFacturacion= function(){
   console.log('modificarDatosDeFacturacion');
    $state.go('configuracionusuario',{pagando:true});
};

fb.leerConfiguracionUsuario()
    .then(function(dato){
        console.log('leerConfiguracionUsuario',dato);
         $scope.configuracion=dato.result.configuracion;
         $scope.verificarDatosDeFacturacion();
        console.log('leerConfiguracionUsuario',  $scope.configuracion);
         $scope.$apply(function () {});
    })
    .catch(function(error){
         console.log('error leerConfiguracionUsuario',error);
    });

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

}]);






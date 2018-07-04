'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:ConsutlasrespuestasCtrl
 * @description
 * # ConsutlasrespuestasCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')
  // .controller('ConsutlasrespuestasCtrl', function () {

  .controller('ConsutlasrespuestasCtrl', ['$scope','$state','firebaseservice', '$http', function ($scope,$state,fb,$http) {
        console.log('ConsutlasrespuestasCtrl');
var self=this;
this.listaUsuarios={};
this.usuarioAdministrador={};

$scope.listaConsultasPendientes={};
fb.listarConsultasPendientes()
    .then(function(dato){
        console.log('cont listaConsultasPendientes',dato);
        $scope.listaConsultasPendientes= dato.result;
        // $scope.listaConsultasPendientes=fb.snapshotToArray(dato.result);

        console.log('cont listaConsultasPendientes');
        console.log($scope.listaConsultasPendientes);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listaConsultasPendientes',error);
    });


    $scope.responderConsulta=function(consulta,mensaje){
   console.log('responderConsulta', consulta);
   fb.responderConsulta(consulta,mensaje);
};

$scope.sacarDelListado=function(consulta){
   console.log('sacarDelListado', consulta);
   fb.sacarDelListado(consulta);
};


$scope.sendMail2=function(consulta){
  console.log("sendMail2");
  console.log(consulta);

  return new Promise(function (resolve, reject){
    console.log("Construccion de la promesa sendMail2");

var mensajeConsulta=
  ' bgcolor="#ee4c50";';
  // // ' background: rgba(0,255, 250, .5);'+
  // ' float: left !important;'+
  // ' border-style: solid !important;'+
  // ' border-width: 2px;'+
  // ' border-style: solid;'+
  // ' border-color:green;'+
  // ' border-radius: 15px;'+
  // ' height: 120px;'+
  // ' align-self:left;'+
  // ' margin: 10px;'+
  // ' padding:  10px;'+
  // ' width: 70%;'+
  // ' height: auto;';

var mensajeRespuesta='';
  // ' bgcolor= #ee4c50;';
  // ' bgcolor= rgba(0,255, 100, .5);';
  // ' background= rgba(0,255, 100, .5);'+
  // ' float= right !important;'+
  // ' border-style= solid !important;'+
  // ' border-width= 2px;'+
  // ' border-style= solid;'+
  // ' border-color=green;'+
  // ' border-radius= 15px;'+
  // ' height= 120px;'+
  // ' align-self:left;'+
  // ' margin= 10px;'+
  // ' padding=  10px;'+
  // ' width= 70%;'+
  // ' height= auto;';

var generadorDelMensaje=

    ' text-align= right;'+
    ' font-weight= bold';


// var htmlMail=" <table width='100%' bgcolor='#f6f8f1' border='3' cellpadding='0' cellspacing='0'>";
var htmlMail=" <table width='100%'  border='0' cellpadding='0' cellspacing='0'>";
consulta.listaMensajes.forEach(function(mensaje){
  var estilo=mensajeConsulta;
  if(mensaje.tipoMensaje==='respuesta'){
  estilo=mensajeRespuesta;

  htmlMail+=

  "<tr >"+

         "<td></td><td></td><td bgcolor= #ee4c50 style="+ estilo+"><span > "+mensaje.mensaje+"</span></td>"+
      "<td><p style="+ generadorDelMensaje+"> <small>"+mensaje.usuarioMail, mensaje.timestamp+" | date:'dd-MM-yyyy hh:mm:ss'"+"</small></p></td>"+
  "</tr>";
 console.log("estilo "+estilo);
  }

else{
 htmlMail+=

  "<tr >"+
         "<td style="+ estilo+"><span > "+mensaje.mensaje+"</span></td>"+
      "<td><p style="+ generadorDelMensaje+"> <small>"+mensaje.usuarioMail, mensaje.timestamp+" | date:'dd-MM-yyyy hh:mm:ss'"+"</small></p></td>"+
  "<td></td><td></td></tr>";
}

});
 htmlMail+="</table>";

      var req = {
        method: 'post',

        // url: 'https://us-central1-laflota-19ada.cloudfunctions.net/enviarGmail2',
        url: 'https://us-central1-laflota-19ada.cloudfunctions.net/enviarEmail',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'

          },
         params: {
        "remetente":self.usuarioAdministrador.configuracionAdministrador.mail,
        "pass":self.usuarioAdministrador.configuracionAdministrador.pass,
        // "pass":'blpemwqdjdywwzzx',

        "assunto":consulta.titulo,
        "destinatarios": 'perez.juan.jose@gmail.com',
        // "corpo": consulta,
         "corpoHtml": '<h1> '+consulta.titulo+htmlMail,
        },
        data: {
        "remetente":'perez.juan.jose@gmail.com',
        "pass":'blhwldnxsdslaqfi',
        "assunto":'test',
        "destinatarios": 'perez.juan.jose@gmail.com',
        // "corpo": '<h1>titulo</h1>'+consulta,
        "corpoHtml": '<h1> jj'+consulta.titulo+'</h1>'+'<p1>'+consulta+'</p1>',

        }
      };
      // { timeout: 100 }
            // req.headers.Authorization="Bearer " +spotiService.getSpotifyAccessTocken();
      console.log("sendMail2 construye http req");
      $http(req)
      .then(function (response) {
        console.log('sendMail2 Respuesta', response.data);
        console.log(response);
        resolve({ value: "sendMail2 ok", result:response});
        })
      .catch( function (error) {
          console.log('PsendMail2', error);
          reject({ value: "sendMail2 error", result: error});
      });

  }).then(function(data){
      console.log('retorno de promesa ok', data);
  }).catch(function(error){
      console.log('retorno de promesa error', error);
  });

};

fb.listarUsuarios()
    .then(function(dato){
        console.log('listarUsuarios',dato);
        self.listaUsuarios=dato.result;
        var usuario=fb.getUsuario();
        console.log(usuario);
        self.usuarioAdministrador=$scope.buscarUsuario(usuario.email);
        console.log('self.usuarioAdministrador',self.usuarioAdministrador);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('listarUsuarios',error);
    });

$scope.buscarUsuario=function(mail){
    console.log('buscarUsuario',mail)
    for (var i = 0; i < self.listaUsuarios.length; i+=1) {

        if(self.listaUsuarios[i].mail==mail){
             console.log('buscarUsuario true');
            return self.listaUsuarios[i];
        };
    };
};


  }]);


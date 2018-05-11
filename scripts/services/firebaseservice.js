'use strict';

/**
 * @ngdoc service
 * @name laFlotaApp.firebaseservice
 * @description
 * # firebaseservice
 * Service in the laFlotaApp.
 */
angular.module('laFlotaApp')
  // .service('firebaseservice', function () {
  .service('firebaseservice',['$localStorage','$firebaseObject','$firebaseArray','$q', function (localStorage,$firebaseObject,$firebaseArray,$q) {

var self=this;

this.writeNuevoUsuario=function(mail) {
  console.log('writeNuevoUsuario');
  console.log(mail);


  var ref = firebase.database().ref();
  var newPracticaKey= ref.child('Usuarios').child(mail);
  var a={"habilitado":true,"perfil":{"usuarios":true,"cargarCanciones":true,"CargarPagos":true,"Planes":true,"Bonos":true,"Consultas":true}};

 var list = $firebaseArray(newPracticaKey);
            list.$add(a).then(function(ref) {
                  console.log(ref);
            var id = ref.key;
            console.log('writeNuevoUsuario added record with id ' + id);
            console.log('list index ' + list.$indexFor(id));
            // self.addPracticaMisPracticas(ref.key,userKey, model,propiedades);

            })
            .catch(function(error) {
                  console.log("writeNuevoUsuario", error);
            });



};



this.crearUsuario=function(mail,propiedades) {
  console.log('crearUsuario');
  console.log(mail);
  console.log(propiedades);



  var ref = firebase.database().ref();
  var newPracticaKey= ref.child('Usuarios');
  console.log(newPracticaKey);
  // var list = $firebaseObject(newPracticaKey);
  var list = $firebaseArray(newPracticaKey);
  // var a={"mail":mail, "propiedades":propiedades };
  propiedades.mail=mail;

  // obj.propiedades=propiedades;
list.$add(propiedades).then(function(ref) {
    // obj.$save().then(function(ret) {
                console.log(ref);
              // ref.key === obj.$id; // true
            }, function(error) {
              console.log('Error:', error);
            });

};


this.modificarUsuario=function(usuario) {
  console.log('fb modifucarUsuario');
  console.log(usuario);

  var ref = firebase.database().ref();
  var key= ref.child('Usuarios').child(usuario.$id);
  console.log(key);
  var obj = $firebaseObject(key);
 obj.habilitado=usuario.habilitado;
 obj.mail=usuario.mail ;
 obj.perfil=usuario.perfil ;

    obj.$save().then(function(ret) {
                console.log(ref);
              // ref.key === obj.$id; // true
            }, function(error) {
              console.log('Error:', error);
            });

};


this.buscarUsuario=function(mail) {
     console.log('buscarUsuario');

return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa buscarUsuario');

      var ref = firebase.database().ref();
  var UserKey= ref.child('Usuarios').child(mail);

 var list = $firebaseArray(UserKey);
 list.$loaded(
  function() {
    // x === list; // true
    console.log('buscarUsuario exito');
    console.log(list);
   resolve({ value: 'retorno buscarUsuario', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error buscarUsuario', result: error});
  });


});
};


this.listarUsuarios=function() {
     console.log('listarUsuarios');

return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa listarUsuarios');

      var ref = firebase.database().ref();
  var UserKey= ref.child('Usuarios')
 var list = $firebaseArray(UserKey);
 list.$loaded(
  function() {
    // x === list; // true
    console.log('listarUsuarios exito');
    console.log(list);
   resolve({ value: 'retorno listarUsuarios', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarUsuarios', result: error});
  });


});
};

this.getUsuario=function(){
    console.log('getUsuario');
  return localStorage.user;
};


this.crearUsuarioConsulta=function(titulo,mensaje,consultaKey) {

  console.log('crearUsuarioConsulta');
  console.log(  localStorage.user);

var usuario=  localStorage.user;

  console.log('crearUsuarioConsulta',usuario);
  console.log('crearUsuarioConsulta',usuario.email);

var ref = firebase.database().ref();
var refConsulta;
var refMensaje;
var consultakey;
var mensajekey;
var esConsultaNueva=false;
if(!consultaKey){
    refConsulta= ref.child('Consultas').child(usuario.uid).push();
    consultakey=refConsulta.key;
    refMensaje= ref.child('Consultas').child(usuario.uid).child(consultakey).push();
    mensajekey=refMensaje.key;
    esConsultaNueva=false;
} else {
    refConsulta= ref.child('Consultas').child(usuario.uid);
    consultakey=refConsulta.key;
    refMensaje= ref.child('Consultas').child(usuario.uid).child(consultakey).push();
    mensajekey=refMensaje.key;
    esConsultaNueva=true;
};

var mensaje = {'mensaje':mensaje, 'timestamp': firebase.database.ServerValue.TIMESTAMP,'usuarioMail':usuario.email};
var consulta={'titulo':titulo, 'status':'pendiente', mensajekey : mensaje };
var consultaPendiente=consulta;
consultaPendiente.userkey=usuario.uid;

var updateMultiple={};

if(esConsultaNueva){
updateMultiple['Consultas/'+usuario.uid+'/'+consultakey]=consulta;

} else{
    updateMultiple['Consultas/'+usuario.uid+'/'+consultakey+'/'+mensajekey]=mensaje;
}



updateMultiple['ConsultasPendientes/'+consultakey]=consultaPendiente;

ref.update(updateMultiple,function(error){
    if(error){

  console.log('crearUsuarioConsulta error'+ error);
    } else {
        console.log('crearUsuarioConsulta ok');
    };
});


};


this.responderConsulta=function(consulta){
   console.log('responderConsulta ',   consulta);

var usuario=  localStorage.user;


var ref = firebase.database().ref();

var updateMultiple={};
updateMultiple['Consultas/'+consulta.userkey+'/'+consulta.$id+'/status']='ConRespuesta';

updateMultiple['ConsultasPendientes/'+consulta.$id]=null;
  console.log('responderConsulta updateMultiple');
  console.log(updateMultiple);
ref.update(updateMultiple,function(error){
    if(error){

  console.log('responderConsulta error'+ error);
    } else {
        console.log('responderConsulta ok');
    };
});
};

this.listarUsuariosConsultas=function() {
     console.log('listarUsuariosConsultas');

return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa listarUsuariosConsultas');
var usuario=  localStorage.user;
      var ref = firebase.database().ref();
  var key= ref.child('Consultas').child(usuario.uid);
 var list = $firebaseArray(key);
 list.$loaded(
  function() {
    // x === list; // true
    console.log('listarUsuariosConsultas exito');
    console.log(list);
   resolve({ value: 'retorno listarUsuariosConsultas', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarUsuariosConsultas', result: error});
  });


});
};


this.listarConsultasPendientes=function() {
     console.log('listarConsultasPendientes');

return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa listarConsultasPendientes');
var usuario=  localStorage.user;
      var ref = firebase.database().ref();
  var key= ref.child('ConsultasPendientes')
 var list = $firebaseArray(key);
 list.$loaded(
  function() {
    // x === list; // true
    console.log('listarConsultasPendientes exito');
    console.log(list);
   resolve({ value: 'retorno listarConsultasPendientes', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarConsultasPendientes', result: error});
  });


});
};

this.snapshotToArray=function (snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};



this.grabarProducto=function(productoKey, producto) {

  console.log('grabarProducto');
  console.log(productoKey);
  console.log(producto);



var ref = firebase.database().ref();

var esProductoNuevo=false;

if(!productoKey){
    var refProductoKey= ref.child('Productos').push();
    productoKey=refProductoKey.key;
    esProductoNuevo=true;
} else {
    // refConsulta= ref.child('Productos').child(productoKey);
     esProductoNuevo=false;
};



var updateMultiple={};

  console.log('grabarProducto updateMultiple');
  console.log(updateMultiple);
if(producto.LandingdelProducto){
updateMultiple['Productos/'+productoKey]=producto;
updateMultiple['LaFlotaProductosLanding/'+productoKey]=producto;
} else{
  updateMultiple['Productos/'+productoKey]=producto;
  updateMultiple['LaFlotaProductosLanding/'+productoKey]=null;

    // updateMultiple['Consultas/'+usuario.uid+'/'+consultakey+'/'+mensajekey]=producto;
}


 // var obj = $firebaseObject(productoKey);
 // obj.habilitado=usuario.habilitado;
 // obj.mail=usuario.mail ;
 // obj.perfil=usuario.perfil ;

 //    obj.$save().then(function(ref) {
 //                console.log(ref);
 //              // ref.key === obj.$id; // true
 //            }, function(error) {
 //              console.log('Error:', error);
 //            });

  console.log('grabarProducto updateMultiple');
  console.log(updateMultiple);

ref.update(updateMultiple,function(error){
    if(error){

  console.log('grabarProducto error'+ error);
    } else {
        console.log('grabarProducto ok');
    };
});
};




this.listarProductos=function(){
  console.log('listarProductos');

  return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa listarProductos');
    var ref = firebase.database().ref();
    var key= ref.child('Productos')
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarProductos exito');
      console.log(list);
      resolve({ value: 'retorno listarProductos', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarProductos', result: error});
  });


});
};

this.listarProductosLanding=function(){
  console.log('listarProductosLanding');

  return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa listarProductosLanding');
    var ref = firebase.database().ref();
    var key= ref.child('LaFlotaProductosLanding')
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarProductosLanding exito');
      console.log(list);
      resolve({ value: 'retorno listarProductosLanding', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarProductosLanding', result: error});
  });


});
};



this.grabarDetalleLanzamiento=function(albumKey,album) {

  console.log('grabarDetalleLanzamiento');
  console.log(albumKey);
  console.log(album);




var ref = firebase.database().ref();



if(!albumKey){
    var refAlbumKey= ref.child('LanzamientosUsuario').push();
    albumKey=refAlbumKey.key;
    album.timestampCreacion= firebase.database.ServerValue.TIMESTAMP;

} else {
    // refConsulta= ref.child('Productos').child(productoKey);
album.timestampUltimaModificacion= firebase.database.ServerValue.TIMESTAMP;
};



var updateMultiple={};

  console.log('grabarDetalleLanzamiento updateMultiple');
  console.log(updateMultiple);
var user=self.getUsuario();
  console.log(user);
updateMultiple['LanzamientosUsuario/'+user.uid+'/'+albumKey]=album;
album.user=user;
updateMultiple['LanzamientosPendientes/'+albumKey]=album;


  console.log('grabarDetalleLanzamiento updateMultiple');
  console.log(updateMultiple);

ref.update(updateMultiple,function(error){
    if(error){

  console.log('grabarDetalleLanzamiento error'+ error);
    } else {
        console.log('grabarDetalleLanzamiento ok');
    };
});

};

this.listarLanzamientosPendientes=function(){
  console.log('listarLanzamientosPendientes');

  return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa listarLanzamientosPendientes');
    var ref = firebase.database().ref();
    var key= ref.child('LanzamientosPendientes')
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarLanzamientosPendientes exito');
      console.log(list);
      resolve({ value: 'retorno listarLanzamientosPendientes', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarLanzamientosPendientes', result: error});
  });


});
};

  }]);

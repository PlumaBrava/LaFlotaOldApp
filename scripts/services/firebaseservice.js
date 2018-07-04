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

this.configurarUsuarioAdministrador=function(mail, pass,usuarioAdministrador) {
  console.log('fb configurarUsuarioAdministrador');
  // var usuario=self.getUsuario();
  console.log(usuarioAdministrador);


  var ref = firebase.database().ref();
  var key= ref.child('Usuarios').child(usuarioAdministrador.$id).child('configuracionAdministrador');
  console.log(key);
  var obj = $firebaseObject(key);

 obj.mail=mail ;
 obj.pass=pass ;

    obj.$save().then(function(ret) {
                console.log(ref);
              // ref.key === obj.$id; // true
            }, function(error) {
              console.log('Error:', error);
            });

};




this.buscarUsuario=function(mail) {
     console.log('buscarUsuario');

return $q(function (resolve, reject){
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


this.configuracionUsuario=function(configuracion) {
  console.log('fb configuracionUsuario');
  console.log(configuracion);
  console.log(self.getUsuario());
  var ref = firebase.database().ref();
  var key= ref.child('ConfiguracionUsuarios').child(self.getUsuario().uid);
  console.log(key);
  var obj = $firebaseObject(key);
  obj.configuracion=configuracion;
return $q(function (resolve, reject){
    obj.$save().then(function(ret) {
                console.log(ref);
              resolve({ value: 'retorno configuracionUsuario', result: ret});
            }, function(error) {
              console.log('Error:', error);
               reject({ value: 'error configuracionUsuario', result: error});
            });

});
};

this.leerConfiguracionUsuario=function() {
  console.log('fb leerConfiguracionUsuario');

  return $q(function (resolve, reject){
    var ref = firebase.database().ref();
    var key= ref.child('ConfiguracionUsuarios').child(self.getUsuario().uid);
    var obj = $firebaseObject(key);
            obj.$loaded()
              .then(function(data) {
                console.log(data === obj); // true
                console.log(data);
                resolve({ value: 'retorno leerConfiguracionUsuario', result: data});
              })
              .catch(function(error) {
                console.error("Error:", error);
                reject({ value: 'error leerConfiguracionUsuario', result: error});
              });

  });

};



this.listarUsuarios=function() {
  console.log('listarUsuarios');

  return $q(function (resolve, reject){
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
// var refMensaje;
var consultaKey;
// var mensajekey;
var esConsultaNueva=false;
if(!consultaKey){
    refConsulta= ref.child('Consultas').child(usuario.uid).push();
    consultaKey=refConsulta.key;
    // refMensaje= ref.child('Consultas').child(usuario.uid).child(consultaKey).push();
    // mensajekey=refMensaje.key;
    esConsultaNueva=true;
} else {
    refConsulta= ref.child('Consultas').child(usuario.uid);
    consultaKey=refConsulta.key;
    // refMensaje= ref.child('Consultas').child(usuario.uid).child(consultaKey).push();
    // mensajekey=refMensaje.key;
    esConsultaNueva=false;
};

var mensaje = [{'mensaje':mensaje, 'timestamp': firebase.database.ServerValue.TIMESTAMP,'usuarioMail':usuario.email}];
var consulta={'titulo':titulo, 'status':'pendiente', 'listaMensajes' : mensaje , 'timestamp': firebase.database.ServerValue.TIMESTAMP};
var consultaPendiente=consulta;
consultaPendiente.userkey=usuario.uid;

var updateMultiple={};

if(esConsultaNueva){
updateMultiple['Consultas/'+usuario.uid+'/'+consultaKey]=consulta;

} else{
    updateMultiple['Consultas/'+usuario.uid+'/'+consultaKey+'/'+'listaMensajes']=mensaje;
}



updateMultiple['ConsultasPendientes/'+consultaKey]=consultaPendiente;

ref.update(updateMultiple,function(error){
    if(error){

  console.log('crearUsuarioConsulta error'+ error);
    } else {
        console.log('crearUsuarioConsulta ok');
    };
});


};

this.agregarMensajeAConsulta=function(consulta,mensaje) {

  console.log('agregarMensajeAConsulta');
  console.log(  localStorage.user);
  var usuario=  localStorage.user;
  console.log('agregarMensajeAConsulta',consulta);
  console.log('agregarMensajeAConsulta',mensaje);
  var ref = firebase.database().ref();
  var consultaKey=consulta.$id;
  var listMsj=new Array(consulta.listaMensajes.length);
  for(var i=0;i<consulta.listaMensajes.length;i++){
    listMsj[i]={};
     console.log('agregarMensajeAConsulta',i + consulta.listaMensajes[i].mensaje);

  listMsj[i].mensaje=consulta.listaMensajes[i].mensaje;
  listMsj[i].timestamp=consulta.listaMensajes[i].timestamp;
  listMsj[i].usuarioMail=consulta.listaMensajes[i].usuarioMail;
  if(consulta.listaMensajes[i].tipoMensaje){
  listMsj[i].tipoMensaje=consulta.listaMensajes[i].tipoMensaje;
  }
  };

  var mensaje ={'mensaje':mensaje, 'timestamp': firebase.database.ServerValue.TIMESTAMP,'usuarioMail':usuario.email };
   listMsj[listMsj.length]=mensaje;
  var consultaUpdate={'titulo':consulta.titulo, 'status':'pendiente', 'listaMensajes' : listMsj , 'timestamp': consulta.timestamp,'userkey':consulta.userkey};

  console.log('agregarMensajeAConsulta',consulta);

  var consultaPendiente=consulta;
  consultaPendiente.userkey=usuario.uid;

  var updateMultiple={};

  updateMultiple['Consultas/'+usuario.uid+'/'+consultaKey]=consultaUpdate;
  updateMultiple['ConsultasPendientes/'+consultaKey]=consultaUpdate;
// updateMultiple['Consultas/'+usuario.uid+'/'+consultaKey+'/'+status]='pendiente';
//   updateMultiple['Consultas/'+usuario.uid+'/'+consultaKey+'/'+'listaMensajes'+'/'+consulta.listaMensajes.length]=mensaje;

//   updateMultiple['ConsultasPendientes/'+consultaKey+'/'+'listaMensajes'+'/'+consulta.listaMensajes.length]=mensaje;
//   updateMultiple['ConsultasPendientes/'+consultaKey+'/'+'/'+status]='pendiente';
    console.log('agregarMensajeAConsulta',updateMultiple);


ref.update(updateMultiple,function(error){
    if(error){

  console.log('agregarMensajeAConsulta error'+ error);
    } else {
        console.log('agregarMensajeAConsulta ok');
    };
});


};

this.responderConsulta=function(consulta,msj){
    console.log('responderConsulta ',   consulta);
    var ref = firebase.database().ref();
    var usuario=  localStorage.user;
    var consultaKey=consulta.$id;
    var mensaje ={'mensaje':msj, 'timestamp': firebase.database.ServerValue.TIMESTAMP,'usuarioMail':usuario.email,'tipoMensaje':'respuesta'};
    var updateMultiple={};

    updateMultiple['Consultas/'+consulta.userkey+'/'+consulta.$id+'/status']='ConRespuesta';
    updateMultiple['Consultas/'+consulta.userkey+'/'+consultaKey+'/'+'listaMensajes'+'/'+consulta.listaMensajes.length]=mensaje;
    updateMultiple['ConsultasPendientes/'+consultaKey+'/'+'listaMensajes'+'/'+consulta.listaMensajes.length]=mensaje;
    // updateMultiple['ConsultasPendientes/'+consulta.$id]=null;
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

this.sacarDelListado=function(consulta){
    console.log('sacarDelListado ',   consulta);
    var ref = firebase.database().ref();
    var usuario=  localStorage.user;
    var consultaKey=consulta.$id;

    var updateMultiple={};

    updateMultiple['ConsultasPendientes/'+consulta.$id]=null;
    console.log('sacarDelListado updateMultiple');
    console.log(updateMultiple);
    ref.update(updateMultiple,function(error){
      if(error){
        console.log('sacarDelListado error'+ error);
      } else {
        console.log('sacarDelListado ok');
      };
    });
};


this.listarUsuariosConsultas=function() {
     console.log('listarUsuariosConsultas');

return $q(function (resolve, reject){
    console.log('Construccion de la promesa listarUsuariosConsultas');
var usuario=  localStorage.user;
console.log('listarUsuariosConsultas',usuario);
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

return $q(function (resolve, reject){
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


}



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

  return $q(function (resolve, reject){
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

this.grabarBono=function(bonoKey, bono) {

  console.log('grabarBono');
  console.log(bonoKey);
  console.log(bono);


var ref = firebase.database().ref();

var esBonoNuevo=false;

if(!bonoKey){
    var refBonoKey= ref.child('Bonos').push();
    bonoKey=refBonoKey.key;
    esBonoNuevo=true;
} else {
    // refConsulta= ref.child('Productos').child(productoKey);
     esBonoNuevo=false;
};



var updateMultiple={};

  console.log('grabarBono updateMultiple');
{
  updateMultiple['Bonos/'+bonoKey]=bono;
  // updateMultiple['LaFlotaProductosLanding/'+productoKey]=null;


}



  console.log('grabarBono updateMultiple');
  console.log(updateMultiple);

ref.update(updateMultiple,function(error){
    if(error){

  console.log('grabarBono error'+ error);
    } else {
        console.log('grabarBono ok');
    };
});
};

this.consumirBono=function(bonoKey) {

  console.log('consumirBono');
  console.log(bonoKey);

  var ref = firebase.database().ref();
  var esBonoNuevo=false;
  if(bonoKey){
    var refBonoKey= ref.child('Bonos').child(bonoKey);

  } else {
    return null;
  };

 console.log('consumirBono  transaction', refBonoKey);

 return refBonoKey.transaction(function(bno){
    console.log('consumirBono  transaction', bno);
    if(bno){
        if(bno.CantidadMaxima>bno.CantidadAplicada){
          bno.CantidadAplicada++;
          console.log('bno.CantidadMaxima>bno.CantidadAplicada ', bno);
        }

    } else {
        console.log('consumirBono errr');
    };
      return bno;
  });

};

this.restituirBono=function(bonoKey) {

  console.log('restituirBono');
  console.log(bonoKey);

  var ref = firebase.database().ref();
  var esBonoNuevo=false;
  if(bonoKey){
    var refBonoKey= ref.child('Bonos').child(bonoKey);

  } else {
    return null;
  };

 console.log('restituirBono  transaction', refBonoKey);

 return refBonoKey.transaction(function(bno){
    console.log('restituirBono  transaction', bno);
    if(bno){
        if(bno.CantidadAplicada>1){
          bno.CantidadAplicada--;
          console.log('restituirBono bno.CantidadAplicada>1 ', bno);
        }

    } else {
        console.log('restituirBono errr');
    };
      return bno;
  });

};



this.listarBonos=function(){
  console.log('listarBonos');

  return $q(function (resolve, reject){
    console.log('Construccion de la promesa listarBonos');
    var ref = firebase.database().ref();
    var key= ref.child('Bonos')
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarBonos exito');
      console.log(list);
      resolve({ value: 'retorno listarBonos', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarBonos', result: error});
  });


});
};

this.buscarBono=function(codigoBono){
  console.log('buscarBono');

  return $q(function (resolve, reject){
    console.log('Construccion de la promesa buscarBono');
    var ref = firebase.database().ref();
    var key= ref.child('Bonos').child(codigoBono);
  //   var list = $firebaseArray(key);
  //     list.$loaded( function() {
  //   // x === list; // true
  //     console.log('listarBonos exito');
  //     console.log(list);
  //     resolve({ value: 'retorno listarBonos', result: list});

  // }, function(error) {
  //   console.error('Error:', error);
  //   reject({ value: 'error listarBonos', result: error});
  // });


    var obj = $firebaseObject(key);
            obj.$loaded()
              .then(function(data) {
                console.log(data === obj); // true
                console.log(data);
                resolve({ value: 'retorno buscarBono', result: data});
              })
              .catch(function(error) {
                console.error("Error:", error);
                reject({ value: 'error buscarBono', result: error});
              });




});
};

this.listarProductosLanding=function(){
  console.log('listarProductosLanding');

  return $q(function (resolve, reject){
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

  return $q(function (resolve, reject){
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


this.listarListarLanzamientosUsuarios=function(){
  console.log('listarListarLanzamientosUsuarios');

  return $q(function (resolve, reject){
    console.log('Construccion de la promesa listarListarLanzamientosUsuarios');
    var ref = firebase.database().ref();
    var user=self.getUsuario();
    var key= ref.child('LanzamientosUsuario').child(user.uid);
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarListarLanzamientosUsuarios exito');
      console.log(list);
      resolve({ value: 'retorno listarListarLanzamientosUsuarios', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarListarLanzamientosUsuarios', result: error});
  });


});
};



this.comprarPlan=function(plan){
    console.log('conprarPlan');
    delete plan.$$hashKey;
    delete plan.$id;
    delete plan.$priority;

    console.log(plan);

    var ref = firebase.database().ref();
    var user=self.getUsuario();
    // var refItemCompraUsuario= ref.child('Carrito').child(user.uid).push();
     var planKey= ref.child('Plan').push().key;

     // generamos una clave Plan Key porque es donde las vamos a acomodar todas luego de que se paguen en
     // Plan ( para la empresa)
     // PlanUsuario (para los usuarios.)
     // Necesitamos una clave única por eso las generamos desde el principio!

    var compra={};
    compra.estado=" ";
    compra.producto=plan;
    // compra.user=self.getUsuario().uid,
    compra.timestampCreacion=firebase.database.ServerValue.TIMESTAMP;
    compra.planKey=planKey;
     console.log(compra);

    var updateMultiple={};

    // plan.user=user; // NO hace falta el usuario en esta etapa. estamos en su carrito.
    // updateMultiple['Compras/'+itemCompraUsuarioKey]=compra;
    updateMultiple['Carrito/'+user.uid+'/'+planKey]=compra;

    console.log('conprarPlan updateMultiple');
    console.log(updateMultiple);
 return $q(function (resolve, reject){
    ref.update(updateMultiple,function(error){
      if(error){
         console.log('conprarPlan error'+ error);
            reject('conprarPlan error'+ error);
      } else {

        console.log('conprarPlan ok');
         resolve("ok");
      };
    });
});
};


this.confirmarCompra=function(compra){
    console.log('confirmarCompra');
    console.log('compra');

if(compra.bono){
    delete compra.bono.$resolved;
    delete compra.bono.$$conf;
    delete compra.bono.$id;
    delete compra.bono.$priority;
    delete compra.bono.$$hashKey;
  };
delete compra.lista.$add;
delete compra.lista.$save;
delete compra.lista.$remove;
delete compra.lista.$keyAt;
delete compra.lista.$indexFor;
delete compra.lista.$loaded;
delete compra.lista.$ref;
delete compra.lista.$watch;
delete compra.lista.$destroy;
delete compra.lista.$getRecord;
delete compra.lista.$$added;
delete compra.lista.$$removed;
delete compra.lista.$$updated;
delete compra.lista.$$moved;
delete compra.lista.$$error;
delete compra.lista.$$getKey;
delete compra.lista.$$process;
delete compra.lista.$$notify;
delete compra.lista.$resolved;
    for (var i=0; i<compra.lista.length;i++){

        delete compra.lista[i].$id;
        delete compra.lista[i].$priority;
        delete compra.lista[i].$$hashKey;
        delete compra.lista[i].$$added;
    };

    console.log(compra);

    compra.timestampCreacion=firebase.database.ServerValue.TIMESTAMP;

     console.log(compra);
    var ref = firebase.database().ref();
    var user=self.getUsuario();
    //  generamos una key en Compras. Luego las agruparemos en esa clave y no queremos que se repitan
      var compraKey= ref.child('Compras').push().key;



    var updateMultiple={};


    updateMultiple['Compras/'+compraKey]=compra;
    updateMultiple['ComprasUsuario/'+user.uid+'/'+compraKey]=compra;
    updateMultiple['Carrito/'+user.uid+'/compraKey']=compraKey;

    console.log('confirmarCompra updateMultiple');
    console.log(updateMultiple);
 return $q(function (resolve, reject){
    ref.update(updateMultiple)
    .then(function(data){
      console.log('confirmarCompra ok');
      console.log(data);

        resolve({ value: 'confirmarCompra ok', data: data});
    })
    .catch(function(error){

         console.log('confirmarCompra error'+ error);
            reject({ value: 'confirmarCompra error', error:error});
    });


    });

};


this.confirmarFacturacion=function(datosFactura, compraKey){
    console.log('confirmarFacturacion');
    console.log(datosFactura);
    console.log(compraKey);


    var ref = firebase.database().ref();
    var user=self.getUsuario();
    console.log(user);
    var updateMultiple={};
    console.log(user.uid);

    updateMultiple['Compras/'+compraKey+'/datosFacturacion']=datosFactura;
    updateMultiple['Compras/'+compraKey+'/estado']='Datos_Faturacion_Completos';

    updateMultiple['ComprasUsuario/'+user.uid+'/'+compraKey+'/datosFacturacion']=datosFactura;
    updateMultiple['ComprasUsuario/'+user.uid+'/'+compraKey+'/estado']='Datos_Faturacion_Completos';

    updateMultiple['Carrito/'+user.uid+'/datosFacturacion']=datosFactura;

    console.log('confirmarFacturacion updateMultiple');
    console.log(updateMultiple);
 return $q(function (resolve, reject){
    ref.update(updateMultiple)
    .then(function(data){
      console.log('confirmarFacturacion ok');
      console.log(data);

        resolve({ value: 'confirmarFacturacion ok', data: data});
    })
    .catch(function(error){

         console.log('confirmarFacturacion error'+ error);
            reject('confirmarFacturacion error'+ error);
    });


    });

};

this.grabarDatosDePago=function(pago, compraKey,planes){
    console.log('grabarDatosDePago');
    console.log(pago);
    console.log(compraKey);
    console.log(planes);


if(planes.bono){
    delete planes.bono.$resolved;
    delete planes.bono.$$conf;
    delete planes.bono.$id;
    delete planes.bono.$priority;
    delete planes.bono.$$hashKey;
  };
delete planes.$add;
delete planes.$save;
delete planes.$remove;
delete planes.$keyAt;
delete planes.$indexFor;
delete planes.$loaded;
delete planes.$ref;
delete planes.$watch;
delete planes.$destroy;
delete planes.$getRecord;
delete planes.$$added;
delete planes.$$removed;
delete planes.$$updated;
delete planes.$$moved;
delete planes.$$error;
delete planes.$$getKey;
delete planes.$$process;
delete planes.$$notify;
delete planes.$resolved;


    var ref = firebase.database().ref();
    var user=self.getUsuario();

    var updateMultiple={};


    for (var i=0; i<planes.length;i++){


        planes[i]['cantidadArtristasUtilizados']=0;
        planes[i]['cantidadAlbumsUtilizados']=0;
        planes[i]['fechaCaducidad']=0;

        updateMultiple['PlanesUsuario/'+user.uid+'/Vigentes/'+planes[i].planKey]=planes[i];
        updateMultiple['Planes/Vigentes/'+planes[i].planKey]=planes[i];

        delete planes[i].$id;
        delete planes[i].$priority;
        delete planes[i].$$hashKey;
        delete planes[i].$$added;
    };




    updateMultiple['Compras/'+compraKey+'/datosPago']=pago;
    updateMultiple['Compras/'+compraKey+'/estado']=pago.status_detail;
    updateMultiple['ComprasUsuario/'+user.uid+'/'+compraKey+'/datosPago']=pago;
    updateMultiple['ComprasUsuario/'+user.uid+'/'+compraKey+'/estado']=pago.status_detail;
    updateMultiple['Carrito/'+user.uid]=null;



    console.log('grabarDatosDePago updateMultiple');
    console.log(updateMultiple);
 return $q(function (resolve, reject){
    ref.update(updateMultiple)
    .then(function(data){
      console.log('grabarDatosDePago ok');
      console.log(data);

        resolve({ value: 'grabarDatosDePago ok', data: data});
    })
    .catch(function(error){

         console.log('grabarDatosDePago error'+ error);
            reject('grabarDatosDePago error'+ error);
    });


    });

};


this.aplicarBono=function(bono){
    console.log('aplicarBono');
    console.log(bono);
    delete bono.$resolved;
    delete bono.$$conf;
    delete bono.$id;
    delete bono.$priority;
    var ref = firebase.database().ref();
    var user=self.getUsuario();
    var updateMultiple={};


    updateMultiple['Carrito/'+user.uid+'/'+'bono']=bono;

    console.log('aplicarBono updateMultiple');
    console.log(updateMultiple);
 return $q(function (resolve, reject){
    ref.update(updateMultiple,function(error){
      if(error){
         console.log('aplicarBono error'+ error);
            reject('aplicarBono error'+ error);
      } else {

        console.log('aplicarBono ok');
         resolve("ok");
      };
    });
});
};

this.cancelarBono=function(){
    console.log('cancelarBono');

    var ref = firebase.database().ref();
    var user=self.getUsuario();
    var updateMultiple={};


    updateMultiple['Carrito/'+user.uid+'/'+'bono']=null;

    console.log('cancelarBono updateMultiple');
    console.log(updateMultiple);
 return $q(function (resolve, reject){
    ref.update(updateMultiple,function(error){
      if(error){
         console.log('cancelarBono error'+ error);
            reject('cancelarBono error'+ error);
      } else {

        console.log('cancelarBono ok');
         resolve("ok");
      };
    });
});
};

this.cancelarCompra=function(compra){
    console.log('cancelarCompra');


    console.log(compra);

    var ref = firebase.database().ref();
    var user=self.getUsuario();


    var updateMultiple={};


    updateMultiple['Compras/'+compra.$id]=null;
    updateMultiple['Carrito/'+user.uid+'/'+compra.$id]=null;

    console.log('cancelarCompra updateMultiple');
    console.log(updateMultiple);
 return $q(function (resolve, reject){
    ref.update(updateMultiple,function(error){
      if(error){
         console.log('cancelarCompra error'+ error);
            reject('cancelarCompra error'+ error);
      } else {

        console.log('cancelarCompra ok');
         resolve("ok");
      };
    });
});
};


this.listarCarrito=function(){
  console.log('listarCarrito');

  return $q(function (resolve, reject){
    console.log('Construccion de la promesa listarCarrito');
    var ref = firebase.database().ref();
    var user=self.getUsuario();
    var key= ref.child('Carrito').child(user.uid)
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarCarrito exito');
      console.log(list);
      resolve({ value: 'retorno listarCarrito', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarCarrito', result: error});
  });


});
};


this.listarMisCompras=function(){
  console.log('listarMisCompras');
  // var promesa =$q.defer();
  return $q(function (resolve, reject){
    console.log('Construccion de la promesa listarMisCompras');
    var ref = firebase.database().ref();
    var user=self.getUsuario();
    var key= ref.child('ComprasUsuario').child(user.uid)
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarMisCompras exito');
      console.log(list);
      resolve({ value: 'retorno listarMisCompras', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarMisCompras', result: error});
  });


});
};

this.listarMisPlanes=function(){
  console.log('listarMisPlanes');
  // var promesa =$q.defer();
  return $q(function (resolve, reject){
    console.log('Construccion de la promesa listarMisPlanes');
    var ref = firebase.database().ref();
    var user=self.getUsuario();
    var key= ref.child('PlanesUsuario').child(user.uid)
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarMisPlanes exito');
      console.log(list);
      resolve({ value: 'retorno listarMisPlanes', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarMisPlanes', result: error});
  });


});
};



this.listarCompras=function(){
  console.log('listarCompras');
  // var promesa =$q.defer();
  return $q(function (resolve, reject){
    console.log('Construccion de la promesa listarCompras');
    var ref = firebase.database().ref();

    var key= ref.child('Compras')
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarCompras exito');
      console.log(list);
      resolve({ value: 'retorno listarCompras', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarCompras', result: error});
  });


});
};

/// Artistas


this.agregarArtista=function(artista){
  console.log('AgregarArtista');
  console.log(artista);
  var ref = firebase.database().ref();
  var user=self.getUsuario();
  var artistaUsuarioKey
  if(!artista.id){
    var refArtistaUsuario= ref.child('ArtistaUsuario').child(user.uid).push();
    artistaUsuarioKey=refArtistaUsuario.key;
    artista.id=artistaUsuarioKey;
  } else {

    artistaUsuarioKey=artista.id;
  };

  var updateMultiple={};
  updateMultiple['ArtistaUsuario/'+user.uid+'/'+artistaUsuarioKey]=artista;
  console.log('AgregarArtista updateMultiple');
  console.log(updateMultiple);
  return $q(function (resolve, reject){
    ref.update(updateMultiple,function(error){
      if(error){
        console.log('AgregarArtista error'+ error);
        reject('AgregarArtista error'+ error);
      } else {
        console.log('AgregarArtista ok');
        resolve("ok");
      };
    });
  });
};


this.cancelarArtistaUsuario=function(artista){
    console.log('cancelarArtistaUsuario');


    console.log(artista);

    var ref = firebase.database().ref();
    var user=self.getUsuario();


    var updateMultiple={};



    updateMultiple['ArtistaUsuario/'+user.uid+'/'+artista.$id]=null;

    console.log('cancelarArtistaUsuario updateMultiple');
    console.log(updateMultiple);
 return $q(function (resolve, reject){
    ref.update(updateMultiple,function(error){
      if(error){
         console.log('cancelarArtistaUsuario error'+ error);
            reject('cancelarArtistaUsuario error'+ error);
      } else {

        console.log('cancelarArtistaUsuario ok');
         resolve("ok");
      };
    });
});
};


this.listarArtistaUsuario=function(){
  console.log('listarArtistaUsuario');

  return $q(function (resolve, reject){
    console.log('Construccion de la promesa listarArtistaUsuario');
    var ref = firebase.database().ref();
    var user=self.getUsuario();
    var key= ref.child('ArtistaUsuario').child(user.uid)
    var list = $firebaseArray(key);
      list.$loaded( function() {
    // x === list; // true
      console.log('listarArtistaUsuario exito');
      console.log(list);
      resolve({ value: 'retorno listarArtistaUsuario', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error listarArtistaUsuario', result: error});
  });


});
};

  }]);

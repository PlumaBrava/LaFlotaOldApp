'use strict';

/**
 * @ngdoc function
 * @name laFlotaApp.controller:BonosCtrl
 * @description
 * # BonosCtrl
 * Controller of the laFlotaApp
 */
angular.module('laFlotaApp')

      .controller('BonosCtrl', ['$scope','$state', '$stateParams','firebaseservice', '$translate','$uibModal','subirArchivo','subirarchivosong', function ($scope,$state, $stateParams, fb,$translate,$uibModal,subirArchivo,subirarchivosong) {
        console.log('BonosCtrl');

   console.log('$stateParams.bono',$stateParams.bono);
   var self=this;
   $scope.ErrorCodigo='';
if($stateParams.bono){

    $scope.bono={
        bonoKey:$stateParams.bono.$id,
        Codigo:$stateParams.bono.Codigo,
        Descripcion:$stateParams.bono.Descripcion,
        TipoDescuento:$stateParams.bono.TipoDescuento,
        Moneda:$stateParams.bono.Moneda,
        Monto:$stateParams.bono.Monto,
        Porcentaje:$stateParams.bono.Porcentaje,
        CantidadAplicada:$stateParams.bono.CantidadAplicada,
        CantidadMaxima:$stateParams.bono.CantidadMaxima,
        FechaInicio:new Date($stateParams.bono.FechaInicio),
        FechaFin:new Date($stateParams.bono.FechaFin),
        AsociadoAPlan:$stateParams.bono.AsociadoAPlan


        };
} else {

     $scope.bono={
        bonoKey:null,
        Codigo:'nerw',
        Descripcion:'Descripcion del bono',
        TipoDescuento:'montoFijo_',
        Moneda:'ARS',
        Monto:0,
        Porcentaje:0,
        CantidadAplicada:0,
        CantidadMaxima:0,
        FechaInicio:new Date(),
        FechaFin:new Date(),
        AsociadoAPlan:0,

    };
    };


$scope.monedas=[

'ARS',
'CLP',
'BRL',
'UYU',
'PYG',
'EUR'
];

   $scope.todayFechaInicio = function() {
    $scope.bono.FechaInicio = new Date();
  };

     $scope.todayFechaFin = function() {
    $scope.bono.FechaFin = null;
  };



   $scope.clearFechaInicio = function() {
    $scope.bono.FechaInicio = new Date();
  };

     $scope.clearFechaFin = function() {
    $scope.bono.FechaFin = null;
  };



  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    // dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1,
    clear:'clear Juan'
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

fb.listarProductos()
    .then(function(dato){
        console.log('listarProductos',dato);
        $scope.listaProductos=dato.result;
        console.log('listarProductos',$scope.listaProductos);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listarUsuariosConsultas',error);
    });

fb.listarBonos()
    .then(function(dato){
        console.log('listarBonos',dato);
        $scope.listaBonos=dato.result;
        console.log('listarBonos',$scope.listaProductos);
          $scope.$apply(function () {});
         // $state.go('Usuariosperfiles');
    })
    .catch(function(error){
         console.log('cont listarBonos',error);
    });


$scope.crearBono=function(){
 console.log('crearBono ');
 if(self.losDatosDelBonoSonCorrectos()){
  fb.grabarBono($scope.bono.Codigo,$scope.bono);
        $state.go('listadobonos');
        }
};

this.losDatosDelBonoSonCorrectos=function(){
    console.log('losDatosDelBonoSonCorrectos ');
    console.log($scope.bono);
    $scope.ErrorCodigo='';
    $scope.ErrorDescripcion='';
    $scope.ErrorTipoDescuento='';
    $scope.ErrorPorcentaje='';
    $scope.ErrorMonto='';
    $scope.ErrorMoneda='';
    $scope.ErrorCantidadMaxima='';
    $scope.ErrorFechaInicio='';
    $scope.ErrorFechaFin='';
    $scope.ErrorAsociadoAPlan='';


    var bonosSonCorrectos=true;
    if($scope.bono.Codigo==''||$scope.bono.Codigo==null){
        bonosSonCorrectos=false;
        $scope.ErrorCodigo='ErrordeCodigoDeBono_';
    };

    if($scope.bono.Descripcion==''||$scope.bono.Descripcion==null){
        bonosSonCorrectos=false;
        $scope.ErrorDescripcion='ErrorDescripcionDeBono_';
    };

    if($scope.bono.TipoDescuento==''||$scope.bono.TipoDescuento==null){
        bonosSonCorrectos=false;
        $scope.ErrorTipoDescuento='ErrorIngreseTipoDescuentoDeBono_';
        }
        else if($scope.bono.TipoDescuento=='porcentaje_' ){
                if(parseFloat($scope.bono.Porcentaje)<=0 || parseFloat($scope.bono.Porcentaje)>100){
                bonosSonCorrectos=false;
                $scope.ErrorPorcentaje='ErrorPorcentaje_';
            }

        } else if($scope.bono.TipoDescuento=='montoFijo_' ){

            if(parseFloat($scope.bono.Monto)<=0){
                bonosSonCorrectos=false;
                $scope.ErrorMonto='ErrorMontoDeBono_';
            }
            if($scope.bono.Moneda==''||$scope.bono.Moneda==null){
                bonosSonCorrectos=false;
                $scope.ErrorMoneda='ErrorMonedaDeBono_';
            }


        } else{$scope.ErrorTipoDescuento='ErrorIngreseTipoDescuentoDeBono_';
                bonosSonCorrectos=false;
        };
    console.log(parseInt($scope.bono.CantidadMaxima));
    if(parseInt($scope.bono.CantidadMaxima)<=0||$scope.bono.CantidadMaxima==null ){
        bonosSonCorrectos=false;
        $scope.ErrorCantidadMaxima='ErrorCantidadMaximaDeBono_';
    };

var Hoy = new Date();//Fecha actual del sistema
Hoy.setHours(0,0,0,0);
$scope.bono.FechaInicio.setHours(0,0,0,0);


    if($scope.bono.FechaInicio.getTime()<Hoy.getTime() ){
         bonosSonCorrectos=false;
        $scope.ErrorFechaInicio='ErrorFechaInicioDeBono_';
    }

    if($scope.bono.FechaInicio.getTime()> $scope.bono.FechaFin.getTime()){
         bonosSonCorrectos=false;
        $scope.ErrorFechaFin='ErrorFechaFinDeBono_';
    }

  if($scope.bono.AsociadoAPlan==null){
         bonosSonCorrectos=false;
        $scope.ErrorAsociadoAPlan='ErrorAsociadoAPlanDeBono_';
    }

    return bonosSonCorrectos;


        // CantidadMaxima:0,
        // FechaInicio:new Date(),
        // FechaFin:new Date(),
        // AsociadoAPlan:0,




};

  }]);

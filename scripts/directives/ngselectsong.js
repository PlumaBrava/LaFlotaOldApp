'use strict';

/**
 * @ngdoc directive
 * @name laFlotaApp.directive:ngSelectSong
 * @description
 * # ngSelectSong
 */
angular.module('laFlotaApp')
  .directive('ngSelectSong',['$parse', function ($parse) {
    var localIndex;
return {
     // template: '<div class='btn btn-primary'></div>',
  restrict: 'A',
// replace: true,
//  restrict: "EA",
// scope: {
// songindex:'=',
// parametro1:'@'
//         },
    link: function(scope,element,attrs){

            console.log('ngSelectSong');

             console.log(scope);
             console.log(element);
             console.log(attrs);


            var model, modelSetter;

            attrs.$observe('ngSelectSong', function(fileModel){
                model = $parse(attrs.ngSelectSong);
                console.log(model);
                modelSetter = model.assign;
            });

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope.$parent, element[0].files[0]);
                    console.log('ngSelectSong archivo' );
                       console.log(model);
                    console.log(scope );
                    console.log(element[0].files[0]);
                });
            });




//  console.log('ngSelectSong');

//  console.log(scope.$index);
// localIndex=scope.$index;
//  console.log(atributos);
//  console.log(el);
//  console.log(scope.songindex);
//  console.log(scope.parametro1);

//       el.on('change', function(e){
//         console.log('ngSelectSong');

//              // console.log(localIndex);
//              // console.log($scope.$index);
//          console.log(scope);
//          console.log(el);
//          console.log(atributos);


//         // console.log($scope.$index);

//        var archivo= $parse(atributos.ngSelectSong).assign(scope,el[0].files[0]);
//        // var songindex= $parse(atributos.songindex).assign(scope,el[0]);
// console.log('archivo',archivo);

//  console.log(scope.songindex);
//  console.log(scope.songindex.index);
//  console.log(scope.parametro1);

        // scope.file = (e.srcElement || e.target).files[0];
        // try{
        //   console.log('try');
        //   var tmppath = URL.createObjectURL(e.target.files[0]);
        //   console.log(tmppath);
        //   scope.$apply(function () {
        //     scope.path = (tmppath);
        //   });
        // }catch(err){
        //   console.log('catch al buscar URL de archivo nulo');
        //   console.log(err);
        //   scope.$apply(function () {
        //     scope.path = null;
        //   });
        // }

        // scope.getSongFile($scope);
      }



  };
  }]);

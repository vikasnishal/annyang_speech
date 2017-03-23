(function() {
    'use strict';

    angular
        .module('annyang')
        .controller('AboutController', AboutController);

    /** @ngInject */
    function AboutController($timeout, webDevTec, toastr,$scope) {
        $scope.tasks=[
        {
          value:'task number 1',
          isChecked : false,
        },{
          value:'task number 2',
          isChecked : false,
        },{
          value:'task number 3',
          isChecked : false,
        },];
        $scope.addTask = function(input){
          var task={
            value : input,
            isChecked : false,
          }
          $scope.tasks.push(task);
          $scope.input = "";
        }
        $scope.toggle = function(index){
          for(var item in $scope.tasks){
            $scope.tasks[item].isChecked = false;
          }
          $scope.tasks[index].isChecked = !$scope.tasks[index].isChecked;

        }
        $scope.clearTask = function(value){
          for(var item in $scope.tasks){
            if($scope.tasks[item].isChecked || $scope.tasks[item].value.toLowerCase() == value.toLowerCase()){
              $scope.tasks.splice(item,1);
              break;
            }
          }

        };
        $scope.toggleSpeech = function(){
          // $scope.isSpeechModeOn = !$scope.isSpeechModeOn;
          if(annyang && $scope.isSpeechModeOn){
            annyang.addCommands(commands);
            annyang.debug();
            annyang.start({autoRestart: true,continuous: false });
          }else{
            annyang.abort();
          }
        }
        var commands = {};
        if(annyang){
          console.log('annyang up and running');
          commands = {
                'add item *val': function(val) {
                    var task = {
                      value : val,
                      isChecked :false
                    }
                    $scope.tasks.push(task);
                    $scope.$apply();
                },
                'clear item *val': function(val){
                  $scope.clearTask(val);
                  $scope.$apply();
                }
            }
        }
    }
})();

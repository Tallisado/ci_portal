'use strict';

// Vms controller
angular.module('vms').controller('VmsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vms',
  function ($scope, $stateParams, $location, Authentication, Vms) {
    $scope.authentication = Authentication;

    // Create new Vm
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vmForm');

        return false;
      }

      // Create new Vm object
      var vm = new Vms({
        vm_name: this.vm_name,
        expire: null,
        owner: this.owner,
        force: this.force,
        loaded: this.loaded
      });

      // Redirect after save
      vm.$save(function (response) {
        $location.path('vms/' + response._id);

        // Clear form fields
        $scope.vm_name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Vm
    $scope.remove = function (vm) {
      if (vm) {
        vm.$remove();

        for (var i in $scope.vms) {
          if ($scope.vms[i] === vm) {
            $scope.vms.splice(i, 1);
          }
        }
      } else {
        $scope.vm.$remove(function () {
          $location.path('vms');
        });
      }
    };

    // Update existing Vm
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vmForm');

        return false;
      }

      var vm = $scope.vm;

      vm.$update(function () {
        $location.path('vms/' + vm._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Vms
    $scope.find = function () {
      $scope.vms = Vms.query();
    };

    // Find existing Vm
    $scope.findOne = function () {
      $scope.vm = Vms.get({
        vmId: $stateParams.vmId
      });
    };
  }
])
.directive('capitalize', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
           if(inputValue === undefined) inputValue = '';
           var capitalized = inputValue.toUpperCase();
           if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }
            return capitalized;
         };
         modelCtrl.$parsers.push(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
})
.filter('makeCaps',function(){

  return function(input){

   var capsInput = input.split(' '),
       newInput = [];

   angular.forEach(capsInput,function(val,index){
    newInput.push(val.substr(0,1).toUpperCase()+val.substr(1));
  });
    return newInput.join(' ');
  };

});

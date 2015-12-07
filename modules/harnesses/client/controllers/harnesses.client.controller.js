'use strict';

// Harnesses controller
angular.module('harnesses').controller('HarnessesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Harnesses',
  function ($scope, $stateParams, $location, Authentication, Harnesses) {
    $scope.authentication = Authentication;

    // Create new Harness
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'harnessForm');

        return false;
      }

      // Create new Harness object
      var harness = new Harnesses({
        vm_name: this.vm_name,
        branchdc: this.branchdc,
        branchdf: this.branchdf,
        branchref: this.branchref,
        branchdpn: this.branchdpn,
        brancheval: this.brancheval,
        branchwebui: this.branchwebui,
        owner: this.owner,
        harness_status: this.harness_status,
        need_refresh: this.need_refresh,
        tc_build_id: this.tc_build_id
      });

      // Redirect after save
      harness.$save(function (response) {
        $location.path('harnesses/' + response._id);

        // Clear form fields
        $scope.vm_name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Harness
    $scope.remove = function (harness) {
      if (harness) {
        harness.$remove();

        for (var i in $scope.harnesses) {
          if ($scope.harnesses[i] === harness) {
            $scope.harnesses.splice(i, 1);
          }
        }
      } else {
        $scope.harness.$remove(function () {
          $location.path('harnesses');
        });
      }
    };

    // Update existing Harness
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'harnessForm');

        return false;
      }

      var harness = $scope.harness;

      harness.$update(function () {
        $location.path('harnesses/' + harness._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Harnesses
    $scope.find = function () {
      $scope.harnesses = Harnesses.query();
    };

    // Find existing Harness
    $scope.findOne = function () {
      $scope.harness = Harnesses.get({
        harnessId: $stateParams.harnessId
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

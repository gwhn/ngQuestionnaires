angular.module('ngQuestionnaires.directives')

  .directive('multipleRequired', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attributes, modelController) {
        scope.$watch(function () {
          return modelController.$modelValue && modelController.$modelValue.length;
        }, function (value) {
          modelController.$setValidity('multipleRequired', value > 1);
        });
      }
    };
  });
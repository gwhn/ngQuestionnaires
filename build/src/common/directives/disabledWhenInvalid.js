angular.module('ngQuestionnaires.directives').directive('disabledWhenInvalid', function () {
  return {
    require: '^form',
    link: function (scope, element, attributes, formController) {
      scope.$watch(function () {
        return formController.$dirty && formController.$valid;
      }, function (value) {
        element.prop('disabled', !value);
      });
    }
  };
});
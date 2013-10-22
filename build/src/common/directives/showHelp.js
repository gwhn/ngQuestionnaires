angular.module('ngQuestionnaires.directives').directive('showHelp', [
  '$animate',
  function ($animate) {
    return {
      require: '^form',
      scope: true,
      replace: true,
      transclude: 'element',
      template: '<span class="help-block" ng-transclude></span>',
      compile: function (element, attributes, transclude) {
        return function (scope, element, attributes, formController) {
          var show = 'show', hide = 'hide';
          scope.$watch(function () {
            var state = hide;
            if ((formController[attributes.on] || formController).$error[attributes.when]) {
              state = show;
            }
            return state;
          }, function (newValue, oldValue) {
            element.removeClass(oldValue).addClass(newValue);
            $animate.removeClass(element, 'animate-' + oldValue);
            $animate.addClass(element, 'animate-' + newValue);
          });
          element.append(transclude(scope));
        };
      }
    };
  }
]);
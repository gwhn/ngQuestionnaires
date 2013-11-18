angular.module('ngQuestionnaires.directives')
  .directive('focus', function () {
    return {
      restrict: 'A',
      scope: {
        on: '='
      },
      link: function (scope, element, attrs) {
        scope.$watch('on', function (value) {
          if (value) {
            element[0].focus();
          }
        });
      }
    };
  });
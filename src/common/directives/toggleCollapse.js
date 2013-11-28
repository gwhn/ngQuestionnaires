angular.module('ngQuestionnaires.directives')

  .directive('toggleCollapse', [
    function () {
      return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div ng-transclude></div>',
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ($scope, $element, $attrs) {
            $scope.isCollapsed = $attrs.isCollapsed || false;
          }]
      };
    }
  ])

  .directive('toggleLabel', [
    function () {
      return {
        require: '^toggleCollapse',
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<button class="btn btn-default" ng-click="isCollapsed = !isCollapsed">' +
          '<span ng-show="isCollapsed">' +
          '<i class="glyphicon glyphicon-chevron-down"></i>' +
          '</span>' +
          '<span ng-hide="isCollapsed">' +
          '<i class="glyphicon glyphicon-chevron-up"></i>' +
          '</span>' +
          '<span ng-transclude></span>' +
          '</button>'
      };
    }
  ])

  .directive('toggleBody', [
    function () {
      return {
        require: '^toggleCollapse',
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div ng-transclude ng-hide="isCollapsed" class="hide-animation">'
      };
    }
  ]);


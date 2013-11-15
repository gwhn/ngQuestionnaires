angular.module('ngQuestionnaires.directives')
  .directive('checkboxList', function () {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        selection: '=',
        items: '=',
        value: '@',
        label: '@'
      },
      template: '<div ng-repeat="item in list">' +
        '<label>' +
        '<input type="checkbox" value="{{item.value}}" ng-checked="item.checked" ng-click="toggle($index)"/>' +
        '{{item.label}}' +
        '</label>' +
        '</div>',
      controller: ['$scope', function ($scope) {
        $scope.toggle = function (index) {
          var item = $scope.list[index],
            i = $scope.selection.indexOf(item.value);
          item.checked = !item.checked;
          if (!item.checked && i > -1) {
            $scope.selection.splice(i, 1);
          } else if (item.checked && i < 0) {
            $scope.selection.push(item.value);
          }
        };
      }],
      link: function (scope, element, attrs) {
        scope.$watch('items.length', function () {
          scope.list = [];
          angular.forEach(scope.items, function (item) {
            scope.list.push({
              value: item[scope.value],
              label: item[scope.label],
              checked: scope.selection.indexOf(item[scope.value]) > -1
            });
          });
        });
      }
    };
  });

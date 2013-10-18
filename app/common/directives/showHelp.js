'use strict';

angular.module('ngQuestionnaires.showHelp', [])
    .directive('showHelp', function () {
        return {
            require: '^form',
            scope: true,
            replace: true,
            transclude: 'element',
            template: '<span class="help-block" ng-transclude></span>',
            compile: function (element, attributes, transclude) {
                return function (scope, element, attributes, formController) {
                    var show = 'show',
                        hide = 'hide';
                    scope.$watch(function () {
                        var state = hide;
                        if ((formController[attributes.on] || formController).$error[attributes.when]) {
                            state = show;
                        }
                        return state;
                    }, function (newValue, oldValue) {
                        element.removeClass(oldValue).addClass(newValue);
                    });
                    element.append(transclude(scope));
                };
            }
        };
    });

'use strict';

angular.module('ngQuestionnaires.validationClass', [])
    .directive('validationClass', function () {
        return {
            require: '^form',
            scope: true,
            link: function (scope, element, attributes, formController) {
                var hasError = 'has-error',
                    hasSuccess = 'has-success';
                scope.$watch(function () {
                    var controller = formController[attributes.on] || formController,
                        state;
                    if (controller.$invalid && controller.$dirty) {
                        state = hasError;
                    } else if (controller.$valid && controller.$dirty) {
                        state = hasSuccess;
                    }
                    return state;
                }, function (newState, oldState) {
                    switch (newState) {
                    case hasError:
                    case hasSuccess:
                        element.removeClass(oldState).addClass(newState);
                        break;
                    default:
                        element.removeClass(hasError).removeClass(hasSuccess);
                        break;
                    }
                });
            }
        };
    });

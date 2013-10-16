'use strict';

angular.module('ngQuestionnaires.validationClassFor', [])
    .directive('validationClassFor', function () {
        return {
            require: '^form',
            link: function (scope, element, attributes, formController) {
                scope.$watch(function () {
                    var controller = formController[attributes.validationClassFor] || formController,
                        state;
                    if (controller.$invalid && controller.$dirty) {
                        state = 'error';
                    } else if (controller.$valid && controller.$dirty) {
                        state = 'success';
                    }
                    return state;
                }, function (state) {
                    switch (state) {
                    case 'error':
                        element.removeClass('has-success').addClass('has-error');
                        break;
                    case 'success':
                        element.removeClass('has-error').addClass('has-success');
                        break;
                    default:
                        element.removeClass('has-error').removeClass('has-success');
                        break;
                    }
                });
            }
        };
    });

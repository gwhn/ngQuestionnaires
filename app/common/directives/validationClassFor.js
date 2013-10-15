'use strict';

angular.module('ngQuestionnaires.validationClassFor', [])
    .directive('validationClassFor', function () {
        return {
            require: '^form',
            link: function (scope, element, attributes, formController) {
                scope.$watch(function () {
                    var field = formController[attributes.validationClassFor],
                        state;
                    if (field.$invalid && field.$dirty) {
                        state = 'error';
                    } else if (field.$valid && field.$dirty) {
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

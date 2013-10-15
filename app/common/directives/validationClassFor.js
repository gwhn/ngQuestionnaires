'use strict';

angular.module('ngQuestionnaires.validationClassFor', [])
    .directive('validationClassFor', function () {
        return {
            require: '^form',
            link: function (scope, element, attributes, formController) {
                scope.$watch(function () {
                    var field = formController[attributes.validationClassFor];
                    return field.$invalid && field.$dirty;
                }, function (value) {
                    if (value) {
                        element.removeClass('has-success').addClass('has-error');
                    } else {
                        element.removeClass('has-error').addClass('has-success');
                    }
                });
            }
        };
    });

'use strict';

angular.module('ngQuestionnaires.validationFactory', [])
    .factory('validationFactory', [function () {
        return {
            validationClasses: function (modelController) {
                return {
                    'has-error': modelController.$invalid && modelController.$dirty,
                    'has-success': modelController.$valid && modelController.$dirty
                };
            },
            isFormValid: function (formController) {
                return formController.$dirty && formController.$valid;
            }
        };
    }]);
angular.module('ngQuestionnaires.directives').directive('uniqueQuestionnaireTitle', [
  'questionnaireFactory',
  function (questionnaireFactory) {
    return {
      require: 'ngModel',
      link: function (scope, element, attributes, modelController) {
        var original, key = 'uniqueQuestionnaireTitle';
        modelController.$formatters.unshift(function (value) {
          original = value;
          return value;
        });
        modelController.$parsers.push(function (value) {
          if (value && value !== original) {
            questionnaireFactory.query({ title: value }).then(function (questionnaires) {
              modelController.$setValidity(key, questionnaires.length === 0);
            });
            return value;
          }
        });
      }
    };
  }
]);
angular.module('ngQuestionnaires.directives')

  .directive('uniqueQuestionText', [
    'underscore',
    'questions',
    function (underscore, questions) {
      return {
        require: 'ngModel',
        link: function (scope, element, attributes, modelController) {
          var original,
            key = 'uniqueQuestionText';
          modelController.$formatters.unshift(function (value) {
            original = value;
            return value;
          });
          modelController.$parsers.push(function (value) {
            if (value && value !== original) {
              questions.query({text: value}).then(function (questions) {
                modelController.$setValidity(key, questions.length === 0);
              });
              return value;
            }
          });
        }
      };
    }
  ]);
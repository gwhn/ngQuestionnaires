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
              modelController.$setValidity(key,
                !underscore.some(questions, function (item) {
                  return item.text === value;
                })
              );
              return value;
            }
          });

        }
      };

    }
  ]);
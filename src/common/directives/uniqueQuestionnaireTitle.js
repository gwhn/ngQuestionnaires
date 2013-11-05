angular.module('ngQuestionnaires.directives')

  .directive('uniqueQuestionnaireTitle', [
    'underscore',
    'questionnaires',
    function (underscore, questionnaires) {

      return {
        require: 'ngModel',
        link: function (scope, element, attributes, modelController) {

          var original,
            key = 'uniqueQuestionnaireTitle';

          modelController.$formatters.unshift(function (value) {
            original = value;
            return value;
          });

          modelController.$parsers.push(function (value) {
            if (value && value !== original) {
              modelController.$setValidity(key,
                !underscore.some(questionnaires, function (item) {
                  return item.title === value;
                })
              );
              return value;
            }
          });

        }
      };

    }
  ]);
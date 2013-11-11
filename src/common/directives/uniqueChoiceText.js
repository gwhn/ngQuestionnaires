angular.module('ngQuestionnaires.directives')

  .directive('uniqueChoiceText', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attributes, modelController) {
        function unique(value) {
          var i, j,
            l = value.length,
            u = true;
          for (i = 0; i < l - 1; i += 1) {
            for (j = i + 1; j < l; j += 1) {
              if (value[i].text === value[j].text) {
                u = false;
                break;
              }
            }
            if (!u) {
              break;
            }
          }
          return u;
        }

        scope.$watch(function () {
          return modelController.$modelValue;
        }, function (value) {
          if (angular.isArray(value) && value.length > 1) {
            modelController.$setValidity('uniqueChoiceText', unique(value));
          }
        }, true);
      }
    };
  });
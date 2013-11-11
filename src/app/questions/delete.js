angular.module('ngQuestionnaires.questions')

  .controller('questionDeleteCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'underscore',
    'title',
    function ($scope, $routeParams, $location, underscore, title) {

      function navigate() {
        $location.path('/questions/list');
      }

      $scope.setTitle(title);

      $scope.$watch(function () {
        return $scope.questions.getByName($routeParams.id);
      }, function (question) {
        $scope.question = question;
      });

      $scope.ok = function () {
        var successMsg = $scope.question.text + ' deleted successfully';
        $scope.questions.remove($scope.question, function (err) {
          if (err) {
            $scope.setAlert('danger', err.code);
          } else {
            underscore.chain($scope.questionnaires)
              .filter(function (questionnaire) {
                return underscore.contains(questionnaire.questions, $routeParams.id);
              })
              .each(function (questionnaire) {
                questionnaire.questions = underscore.without(questionnaire.questions, $routeParams.id);
                $scope.questionnaires.update(questionnaire);
              });
            $scope.setAlert('success', successMsg);
          }
          navigate();
          $scope.$apply();
        });
      };

      $scope.cancel = navigate;

    }
  ]);

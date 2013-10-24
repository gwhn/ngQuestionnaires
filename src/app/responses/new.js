angular.module('ngQuestionnaires.responses')

  .controller('responseNewCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionnaireFactory',
    'responseFactory',
    function ($scope, $state, $stateParams, questionnaireFactory, responseFactory) {

      var response = {answers: {}};

      questionnaireFactory.get($stateParams.id)
        .then(function (questionnaire) {
          $scope.questionnaire = questionnaire;
        }, $scope.addErrorAlert);

      $scope.answer = function (question, choice) {
        response.answers[question] = choice;
      };

      $scope.submit = function () {
        var answers = [],
          key;
        for (key in response.answers) {
          if (response.answers.hasOwnProperty(key)) {
            answers.push({
              question: key,
              choice: response.answers[key]
            });
          }
        }
        responseFactory.add({
          respondent: $scope.respondent,
          questionnaire: $scope.questionnaire.title,
          answers: answers
        })
          .then(function () {
            $scope.addSuccessAlert('Response from ' + $scope.respondent + ' on ' +
              $scope.questionnaire.title + ' saved successfully');
          }, $scope.addErrorAlert)
          .then(function () {
            $state.go('questionnaireList');
          });
      };

    }]);

angular.module('ngQuestionnaires.responses')

  .controller('responseNewCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionnaires',
    'responses',
    function ($scope, $state, $stateParams, questionnaires, responses) {

      var response = {answers: {}};

      $scope.respondent = $scope.user.email;

      $scope.questionnaire = questionnaires.getByName($stateParams.id);

      $scope.answer = function (id, question, choice, index) {
        response.answers[id] = {
          question: question,
          choice: choice,
          index: index
        };
      };

      $scope.submit = function () {
        var answers = [],
          key;
        for (key in response.answers) {
          if (response.answers.hasOwnProperty(key)) {
            answers.push({
              question: response.answers[key].question,
              choice: response.answers[key].choice
            });
          }
        }
        // remember to increment question choice count
        responses.add({
          userId: $scope.user.id,
          respondent: $scope.respondent,
          questionnaire: $scope.questionnaire.title,
          answers: answers
        }, function (err) {
          if (err) {
            $scope.addErrorAlert(err);
          } else {
            $scope.addSuccessAlert('Response from ' + $scope.respondent + ' on ' +
              $scope.questionnaire.title + ' saved successfully');
            $state.go('questionnaireList');
          }
        });
      };

    }
  ]);

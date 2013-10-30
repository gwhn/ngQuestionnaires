angular.module('ngQuestionnaires.responses')

  .controller('responseNewCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$q',
    'questionnaireFactory',
    'questionFactory',
    'responseFactory',
    function ($scope, $state, $stateParams, $q, questionnaireFactory, questionFactory, responseFactory) {

      var response = {answers: {}};

      $scope.loading(true);

      questionnaireFactory.get($stateParams.id)
        .then(function (questionnaire) {
          $scope.questionnaire = questionnaire;
        }, $scope.addErrorAlert)
        .then(function () {
          $scope.loading(false);
        });

      $scope.answer = function (id, question, choice, index) {
        response.answers[id] = {
          question: question,
          choice: choice,
          index: index
        };
      };

      $scope.submit = function () {
        var answers = [],
          key,
          promises = [];
        for (key in response.answers) {
          if (response.answers.hasOwnProperty(key)) {
            answers.push({
              question: response.answers[key].question,
              choice: response.answers[key].choice
            });
            promises.push(questionFactory.increment(key, response.answers[key].index));
          }
        }
        responseFactory.add({
          userId: $scope.user.id,
          respondent: $scope.respondent,
          questionnaire: $scope.questionnaire.title,
          answers: answers
        })
          .then(function () {
            return $q.all(promises);
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

angular.module('ngQuestionnaires.questions')

  .controller('questionNewCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionFactory',
    function ($scope, $state, $stateParams, questionFactory) {

      var navigate = function () {
        var referrer = $stateParams.referrer;
        if (angular.isDefined(referrer)) {
          $state.go('questionList');
        } else {
          $state.go(referrer);
        }
      };

      $scope.action = $state.current.data.action;

      $scope.question = {choices: []};

      $scope.removeChoice = function (index) {
        $scope.question.choices.splice(index, 1);
      };

      $scope.addChoice = function () {
        $scope.question.choices.push({text: ''});
      };

      $scope.save = function () {
        questionFactory.add(angular.copy($scope.question))
          .then(function () {
            $scope.addSuccessAlert($scope.question.text + ' saved successfully');
          }, $scope.addErrorAlert)
          .then(navigate);
      };

      $scope.cancel = navigate;

    }])

  .controller('questionEditCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionFactory',
    function ($scope, $state, $stateParams, questionFactory) {

      var navigate = function () {
        $state.go('questionList');
      };

      $scope.action = $state.current.data.action;

      $scope.loading(true);

      questionFactory.get($stateParams.id)
        .then(function (question) {
          $scope.question = question;
        }, $scope.addErrorAlert)
        .then(function () {
          $scope.loading(false);
        });

      $scope.removeChoice = function (index) {
        $scope.question.choices.splice(index, 1);
      };

      $scope.addChoice = function () {
        if ($scope.question.choices === undefined) {
          $scope.question.choices = [];
        }
        $scope.question.choices.push({text: ''});
      };

      $scope.update = function () {
        questionFactory.update($stateParams.id, $scope.question)
          .then(function () {
            $scope.addSuccessAlert($scope.question.text + ' updated successfully');
          }, $scope.addErrorAlert)
          .then(navigate);
      };

      $scope.cancel = navigate;

    }]);

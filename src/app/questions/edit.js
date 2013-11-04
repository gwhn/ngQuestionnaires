angular.module('ngQuestionnaires.questions')

  .controller('questionNewCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questions',
    function ($scope, $state, $stateParams, questions) {

      var navigate = function () {
        var referrer = $stateParams.referrer,
          id = $stateParams.id;
        if (referrer !== null) {
          if (id !== null) {
            $state.go(referrer, {id: id});
          } else {
            $state.go(referrer);
          }
        } else {
          $state.go('questionList');
        }
      };

      $scope.action = $state.current.data.action;

      $scope.question = {
        userId: $scope.user.id,
        choices: []
      };

      $scope.removeChoice = function (index) {
        $scope.question.choices.splice(index, 1);
      };

      $scope.addChoice = function () {
        $scope.question.choices.push({text: '', count: 0});
      };

      $scope.save = function () {
        questions.add(angular.copy($scope.question), function (err) {
          if (err) {
            $scope.addErrorAlert(err);
          } else {
            $scope.addSuccessAlert($scope.question.text + ' saved successfully');
            navigate();
          }
        });
      };

      $scope.cancel = navigate;

    }])

  .controller('questionEditCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questions',
    function ($scope, $state, $stateParams, questions) {

      var navigate = function () {
        $state.go('questionList');
      };

      $scope.action = $state.current.data.action;

      $scope.question = questions.getByName($stateParams.id);

      $scope.removeChoice = function (index) {
        $scope.question.choices.splice(index, 1);
      };

      $scope.addChoice = function () {
        if ($scope.question.choices === undefined) {
          $scope.question.choices = [];
        }
        $scope.question.choices.push({text: '', count: 0});
      };

      $scope.update = function () {
        questions.update(angular.copy($scope.question), function (err) {
          if (err) {
            $scope.addErrorAlert(err);
          } else {
            $scope.addSuccessAlert($scope.question.text + ' updated successfully');
            navigate();
          }
        });
      };

      $scope.cancel = navigate;

    }]);

angular.module('ngQuestionnaires.questions')

  .controller('questionNewCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    function ($scope, $state, $stateParams) {

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
        $scope.questions.add($scope.question, function (err) {
          if (err) {
            $scope.addErrorAlert(err);
          } else {
            $scope.addSuccessAlert($scope.question.text + ' saved successfully');
            navigate();
            $scope.$apply();
          }
        });
      };

      $scope.cancel = navigate;

    }
  ])

  .controller('questionEditCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    function ($scope, $state, $stateParams) {

      var navigate = function () {
        $state.go('questionList');
      };

      $scope.action = $state.current.data.action;

      $scope.$watch(function () {
        return $scope.questions.getByName($stateParams.id);
      }, function (question) {
        $scope.question = question;
      });

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
        $scope.questions.update($scope.question, function (err) {
          if (err) {
            $scope.addErrorAlert(err);
          } else {
            $scope.addSuccessAlert($scope.question.text + ' updated successfully');
            navigate();
          }
          $scope.$apply();
        });
      };

      $scope.cancel = navigate;

    }
  ]);

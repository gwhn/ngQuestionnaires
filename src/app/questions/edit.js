angular.module('ngQuestionnaires.questions')

  .controller('questionNewCtrl', [
    '$scope',
    '$location',
    '$routeParams',
    'title',
    'action',
    function ($scope, $location, $routeParams, title, action) {

      var navigate = function () {
        var referrer = $routeParams.referrer,
          id = $routeParams.id;
        if (referrer !== undefined) {
          if (id !== undefined) {
            $location.path(referrer).search({id: id});
          } else {
            $location.path(referrer);
          }
        } else {
          $location.path('/questions/list');
        }
      };

      $scope.setTitle(title);
      $scope.action = action;

      $scope.question = {choices: []};

      $scope.removeChoice = function (index) {
        $scope.question.choices.splice(index, 1);
      };

      $scope.addChoice = function () {
        $scope.question.choices.push({text: '', count: 0});
      };

      $scope.save = function () {
        $scope.question.userId = $scope.user.id;
        $scope.questions.add($scope.question, function (err) {
          if (err) {
            $scope.setAlert('danger', err);
          } else {
            $scope.setAlert('success', $scope.question.text + ' saved successfully');
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
    '$location',
    '$routeParams',
    'title',
    'action',
    function ($scope, $location, $routeParams, title, action) {

      var navigate = function () {
        $location.path('/questions/list');
      };

      $scope.setTitle(title);
      $scope.action = action;

      $scope.$watch(function () {
        return $scope.questions.getByName($routeParams.id);
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
            $scope.setAlert('danger', err);
          } else {
            $scope.setAlert('success', $scope.question.text + ' updated successfully');
            navigate();
          }
          $scope.$apply();
        });
      };

      $scope.cancel = navigate;

    }
  ]);

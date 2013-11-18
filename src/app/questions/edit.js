angular.module('ngQuestionnaires.questions')

  .controller('questionNewCtrl', [
    '$scope',
    '$location',
    '$routeParams',
    'title',
    'action',
    function ($scope, $location, $routeParams, title, action) {

      function navigate() {
        var referrer = $routeParams.referrer,
          id = $routeParams.id;
        if (referrer && id) {
          $location.path(referrer).search({id: id});
        } else if (referrer) {
          $location.path(referrer);
        } else {
          $location.path('/questions/list');
        }
      }

      $scope.setTitle(title);
      $scope.action = action;

      $scope.question = {choices: []};

      $scope.removeChoice = function (index) {
        $scope.question.choices.splice(index, 1);
      };

      $scope.addChoice = function () {
        $scope.question.choices.push({text: '', count: 0});
      };

      $scope.isLastEmpty = function (index) {
        return $scope.question.choices[index].text === '' &&
          index === $scope.question.choices.length - 1;
      };

      $scope.save = function () {
        $scope.question.createdAt = Date.now();
        $scope.question.userId = $scope.user.id;
        $scope.question.count = 0;
        $scope.questions.add($scope.question, function (err) {
          if (err) {
            $scope.setAlert('danger', err.code);
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

      function navigate() {
        $location.path('/questions/list');
      }

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

      $scope.isLastEmpty = function (index) {
        return $scope.question.choices[index].text === '' &&
          index === $scope.question.choices.length - 1;
      };

      $scope.update = function () {
        $scope.question.updatedAt = Date.now();
        $scope.questions.update($scope.question, function (err) {
          if (err) {
            $scope.setAlert('danger', err.code);
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

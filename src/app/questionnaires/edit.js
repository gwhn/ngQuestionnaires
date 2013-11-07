angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireNewCtrl', [
    '$scope',
    '$cacheFactory',
    '$location',
    'title',
    'action',
    function ($scope, $cacheFactory, $location, title, action) {

      var questionnaire = $cacheFactory.get('data').get('questionnaire');

      function navigate() {
        $cacheFactory.get('data').remove('questionnaire');
        $location.path('/questionnaires/list');
      }

      $scope.setTitle(title);
      $scope.action = action;


      if (questionnaire !== undefined) {
        $scope.questionnaire = questionnaire;
        $cacheFactory.get('data').remove('questionnaire');
      }

      $scope.addQuestion = function () {
        var referrer = $location.path();
        $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
        $location.path('/questions/new')
          .search({referrer: referrer});
      };

      $scope.save = function () {
        $scope.questionnaire.createdAt = Date.now();
        $scope.questionnaire.userId = $scope.user.id;
        $scope.questionnaire.count = 0;
        $scope.questionnaires.add($scope.questionnaire, function (err) {
          if (err) {
            $scope.setAlert('danger', err);
          } else {
            $scope.setAlert('success', $scope.questionnaire.title + ' saved successfully');
            navigate();
          }
          $scope.$apply();
        });
      };

      $scope.cancel = navigate;

    }
  ])

  .controller('questionnaireEditCtrl', [
    '$scope',
    '$cacheFactory',
    '$location',
    '$routeParams',
    'title',
    'action',
    function ($scope, $cacheFactory, $location, $routeParams, title, action) {

      var questionnaire = $cacheFactory.get('data').get('questionnaire'),
        navigate = function () {
          $cacheFactory.get('data').remove('questionnaire');
          $location.path('/questionnaires/show/' + $scope.questionnaire.$id);
        };

      $scope.setTitle(title);
      $scope.action = action;

      if (questionnaire === undefined) {
        $scope.$watch(function () {
          return $scope.questionnaires.getByName($routeParams.id);
        }, function (questionnaire) {
          $scope.questionnaire = questionnaire;
        });
      } else {
        $scope.questionnaire = questionnaire;
        $cacheFactory.get('data').remove('questionnaire');
      }

      $scope.addQuestion = function () {
        var referrer = $location.path();
        $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
        $location.path('/questions/new')
          .search({
            referrer: referrer,
            id: $routeParams.id
          });
      };

      $scope.update = function () {
        $scope.questionnaire.updatedAt = Date.now();
        $scope.questionnaires.update($scope.questionnaire, function (err) {
          if (err) {
            $scope.setAlert('danger', err);
          } else {
            $scope.setAlert('success', $scope.questionnaire.title + ' updated successfully');
            navigate();
          }
          $scope.$apply();
        });
      };

      $scope.cancel = navigate;

    }
  ]);

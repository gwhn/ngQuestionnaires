angular.module('ngQuestionnaires.categories')

  .controller('categoryCtrl', [
    '$scope',
    function ($scope) {

      $scope.newCategory = false;

      $scope.saveCategory = function () {

        $scope.categories.add($scope.category, function (err) {
          if (err) {
            $scope.setAlert('danger', err.code);
          } else {
            $scope.setAlert('success', $scope.category.name + ' saved successfully');
          }
          $scope.category = {};
          $scope.newCategory = false;
          $scope.$apply();
        });
      };

    }
  ]);
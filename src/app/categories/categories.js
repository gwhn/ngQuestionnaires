angular.module('ngQuestionnaires.categories')

  .config(function ($routeProvider) {

    $routeProvider
      .when('/categories/pack', {
        controller: 'categoriesPackCtrl',
        templateUrl: 'categories/pack.tpl.html',
        resolve: {
          title: function () {
            return 'Categories';
          }
        }
      });

  });

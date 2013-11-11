angular.module('ngQuestionnaires.responses')

  .config(function ($routeProvider) {

    $routeProvider
      .when('/responses/list', {
        controller: 'responseListCtrl',
        templateUrl: 'responses/list.tpl.html',
        resolve: {
          title: function () {
            return 'Responses';
          }
        }
      })

      .when('/responses/new/:id', {
        controller: 'responseNewCtrl',
        templateUrl: 'responses/new.tpl.html',
        resolve: {
          title: function () {
            return 'New Response';
          }
        }
      })

      .when('/responses/delete/:id', {
        controller: 'responseDeleteCtrl',
        templateUrl: 'responses/delete.tpl.html',
        resolve: {
          title: function () {
            return 'Delete Response';
          }
        }
      });

  });

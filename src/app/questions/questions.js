angular.module('ngQuestionnaires.questions')

  .config(function ($routeProvider) {

    $routeProvider
      .when('/questions/list', {
        controller: 'questionListCtrl',
        templateUrl: 'questions/list.tpl.html',
        resolve: {
          title: function () {
            return 'Questions';
          }
        }
      })

      .when('/questions/new', {
        controller: 'questionNewCtrl',
        templateUrl: 'questions/edit.tpl.html',
        resolve: {
          title: function () {
            return 'New Question';
          },
          action: function () {
            return 'Save';
          }
        }
      })

      .when('/questions/edit/:id', {
        controller: 'questionEditCtrl',
        templateUrl: 'questions/edit.tpl.html',
        resolve: {
          title: function () {
            return 'Edit Question';
          },
          action: function () {
            return 'Update';
          }
        }
      });

  });

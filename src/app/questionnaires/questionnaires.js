angular.module('ngQuestionnaires.questionnaires')

  .config(function ($routeProvider) {

    $routeProvider
      .when('/questionnaires/list', {
        controller: 'questionnaireListCtrl',
        templateUrl: 'questionnaires/list.tpl.html',
        resolve: {
          title: function () {
            return 'Questionnaires';
          }
        }
      })

      .when('/questionnaires/show/:id', {
        controller: 'questionnaireShowCtrl',
        templateUrl: 'questionnaires/show.tpl.html',
        resolve: {
          title: function () {
            return 'Questionnaire';
          }
        }
      })

      .when('/questionnaires/new', {
        controller: 'questionnaireNewCtrl',
        templateUrl: 'questionnaires/edit.tpl.html',
        resolve: {
          title: function () {
            return 'New Questionnaire';
          },
          action: function () {
            return 'Save';
          }
        }
      })

      .when('/questionnaires/edit/:id', {
        controller: 'questionnaireEditCtrl',
        templateUrl: 'questionnaires/edit.tpl.html',
        resolve: {
          title: function () {
            return 'Edit Questionnaire';
          },
          action: function () {
            return 'Update';
          }
        }
      });

  });

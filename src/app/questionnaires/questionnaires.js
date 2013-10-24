angular.module('ngQuestionnaires.questionnaires')

  .config(function ($stateProvider) {

    $stateProvider.state('questionnaireList', {
        url: '/questionnaires/list',
        controller: 'questionnaireListCtrl',
        templateUrl: 'questionnaires/list.tpl.html',
        data: {
          pageTitle: 'List Questionnaires'
        }
      })

      .state('questionnaireShow', {
        url: '/questionnaires/show/:id',
        controller: 'questionnaireShowCtrl',
        templateUrl: 'questionnaires/show.tpl.html',
        data: {
          pageTitle: 'Show Questionnaire'
        }
      })

      .state('questionnaireNew', {
        url: '/questionnaires/new',
        controller: 'questionnaireNewCtrl',
        templateUrl: 'questionnaires/edit.tpl.html',
        data: {
          pageTitle: 'New Questionnaire',
          action: 'Save'
        }
      })

      .state('questionnaireEdit', {
        url: '/questionnaires/edit/:id',
        controller: 'questionnaireEditCtrl',
        templateUrl: 'questionnaires/edit.tpl.html',
        data: {
          pageTitle: 'Edit Questionnaire',
          action: 'Update'
        }
      })

      .state('questionnaireDelete', {
        url: '/questionnaires/delete/:id',
        controller: 'questionnaireDeleteCtrl',
        templateUrl: 'questionnaires/delete.tpl.html',
        data: {
          pageTitle: 'Delete Questionnaire'
        }
      });

  });

angular.module('ngQuestionnaires.questionnaires').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('questionnaireList', {
      url: '/questionnaires/list',
      controller: 'QuestionnaireListCtrl',
      templateUrl: 'questionnaires/list.tpl.html',
      data: { pageTitle: 'List Questionnaires' }
    }).state('questionnaireShow', {
      url: '/questionnaires/show/:id',
      controller: 'QuestionnaireShowCtrl',
      templateUrl: 'questionnaires/show.tpl.html',
      data: { pageTitle: 'Show Questionnaire' }
    }).state('questionnaireNew', {
      url: '/questionnaires/new',
      controller: 'QuestionnaireNewCtrl',
      templateUrl: 'questionnaires/edit.tpl.html',
      data: {
        pageTitle: 'New Questionnaire',
        action: 'Save'
      }
    }).state('questionnaireEdit', {
      url: '/questionnaires/edit/:id',
      controller: 'QuestionnaireEditCtrl',
      templateUrl: 'questionnaires/edit.tpl.html',
      data: {
        pageTitle: 'Edit Questionnaire',
        action: 'Update'
      }
    }).state('questionnaireDelete', {
      url: '/questionnaires/delete/:id',
      controller: 'QuestionnaireDeleteCtrl',
      templateUrl: 'questionnaires/delete.tpl.html',
      data: { pageTitle: 'Delete Questionnaire' }
    });
  }
]);
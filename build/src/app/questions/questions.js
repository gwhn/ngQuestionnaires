angular.module('ngQuestionnaires.questions').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('questionList', {
      url: '/questions/list',
      controller: 'QuestionListCtrl',
      templateUrl: 'questions/list.tpl.html',
      data: { pageTitle: 'List Questions' }
    }).state('questionNew', {
      url: '/questions/new?referrer',
      controller: 'QuestionNewCtrl',
      templateUrl: 'questions/edit.tpl.html',
      data: {
        pageTitle: 'New Question',
        action: 'Save'
      }
    }).state('questionEdit', {
      url: '/questions/edit/:id',
      controller: 'QuestionEditCtrl',
      templateUrl: 'questions/edit.tpl.html',
      data: {
        pageTitle: 'Edit Question',
        action: 'Update'
      }
    }).state('questionDelete', {
      url: '/questions/delete/:id',
      controller: 'QuestionDeleteCtrl',
      templateUrl: 'questions/delete.tpl.html',
      data: { pageTitle: 'Delete Question' }
    });
  }
]);
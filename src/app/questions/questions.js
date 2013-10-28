angular.module('ngQuestionnaires.questions')

  .config(function ($stateProvider) {

    $stateProvider.state('questionList', {
        url: '/questions/list',
        controller: 'questionListCtrl',
        templateUrl: 'questions/list.tpl.html',
        data: {
          pageTitle: 'List Questions'
        }
      })

      .state('questionNew', {
        url: '/questions/new?referrer',
        controller: 'questionNewCtrl',
        templateUrl: 'questions/edit.tpl.html',
        data: {
          pageTitle: 'New Question',
          action: 'Save'
        }
      })

      .state('questionEdit', {
        url: '/questions/edit/:id',
        controller: 'questionEditCtrl',
        templateUrl: 'questions/edit.tpl.html',
        data: {
          pageTitle: 'Edit Question',
          action: 'Update'
        }
      });

  });

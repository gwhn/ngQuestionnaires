angular.module('ngQuestionnaires.responses')

  .config(function ($stateProvider) {

    $stateProvider.state('responseList', {
        url: '/responses/list',
        controller: 'ResponseListCtrl',
        templateUrl: 'responses/list.tpl.html',
        data: {
          pageTitle: 'List Responses'
        }
      })

      .state('responseNew', {
        url: '/responses/new/:id',
        controller: 'ResponseNewCtrl',
        templateUrl: 'responses/new.tpl.html',
        data: {
          pageTitle: 'New Response'
        }
      })

      .state('responseDelete', {
        url: '/responses/delete/:id',
        controller: 'ResponseDeleteCtrl',
        templateUrl: 'responses/delete.tpl.html',
        data: {
          pageTitle: 'Delete Response'
        }
      });

  });

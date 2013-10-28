angular.module('ngQuestionnaires.responses')

  .config(function ($stateProvider) {

    $stateProvider.state('responseList', {
        url: '/responses/list',
        controller: 'responseListCtrl',
        templateUrl: 'responses/list.tpl.html',
        data: {
          pageTitle: 'List Responses'
        }
      })

      .state('responseNew', {
        url: '/responses/new/:id',
        controller: 'responseNewCtrl',
        templateUrl: 'responses/new.tpl.html',
        data: {
          pageTitle: 'New Response'
        }
      });

  });

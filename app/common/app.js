'use strict';

angular.module('ngQuestionnaires', [
        'ng',
        'ngRoute',
        'firebase',
        'ngQuestionnaires.disabledWhenInvalid',
        'ngQuestionnaires.validationClassFor',
        'ngQuestionnaires.questionnaireListController',
        'ngQuestionnaires.questionListController',
        'ngQuestionnaires.responseListController'
    ])
    .constant('fbUrl', 'https://ngquestionnaires.firebaseio.com/')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/questionnaires/list', {
            templateUrl: 'questionnaires/questionnaire-list.tpl.html',
            controller: 'questionnaireListController'
        });
        $routeProvider.when('/questions/list', {
            templateUrl: 'questions/question-list.tpl.html',
            controller: 'questionListController'
        });
        $routeProvider.when('/responses/list', {
            templateUrl: 'responses/response-list.tpl.html',
            controller: 'responseListController'
        });
        $routeProvider.otherwise({redirectTo: '/questionnaires/list'});
    }])
    .run([
        '$cacheFactory',
        function ($cacheFactory) {
            var data = $cacheFactory('data');
        }]);

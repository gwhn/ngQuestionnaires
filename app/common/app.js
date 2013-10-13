'use strict';

angular.module('ngQuestionnaires', [
        'ng',
        'ngRoute',
        'ngQuestionnaires.questionnaireListController',
        'ngQuestionnaires.questionListController',
        'ngQuestionnaires.responseListController'
    ])
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
    .run(['$cacheFactory', function ($cacheFactory) {
        var data = $cacheFactory('data');

        data.put('questionnaires', [
            {
                id: 1,
                title: 'questionnaire 1',
                description: 'description for questionnaire 1',
                published: false,
                questions: [1, 2, 3],
                responses: [1, 2, 3, 4]
            },
            {
                id: 2,
                title: 'questionnaire guy 2',
                description: 'description for questionnaire 2',
                published: true,
                questions: [1, 2],
                responses: [1, 2, 3]
            },
            {
                id: 3,
                title: 'questionnaire 3',
                description: 'description for questionnaire 3',
                published: false,
                questions: [1],
                responses: [1, 2]
            }
        ]);

        data.put('questions', [
            {
                id: 1,
                text: 'question guy 1',
                choices: [
                    {text: 'choice 1 of question 1'},
                    {text: 'choice 2 of question 1'},
                    {text: 'choice 3 of question 1'},
                    {text: 'choice 4 of question 1'}
                ],
                questionnaires: [3],
                answers: [1, 2, 3, 4]
            },
            {
                id: 2,
                text: 'question 2',
                choices: [
                    {text: 'choice 1 of question 2'},
                    {text: 'choice 2 of question 2'},
                    {text: 'choice 3 of question 2'},
                    {text: 'choice 4 of question 2'}
                ],
                questionnaires: [2],
                answers: [2, 3, 4]
            },
            {
                id: 3,
                text: 'question 3',
                choices: [
                    {text: 'choice 1 of question 3'},
                    {text: 'choice 2 of guy question 3'},
                    {text: 'choice 3 of question 3'},
                    {text: 'choice 4 of question 3'}
                ],
                questionnaires: [1],
                answers: [3, 4]
            }
        ]);
    }]);

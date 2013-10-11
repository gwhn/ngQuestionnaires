'use strict';

angular.module('ngQuestionnaires.questionnaireListController', [
        'ngQuestionnaires.questionnaireShowController',
        'ngQuestionnaires.questionnaireNewController',
        'ngQuestionnaires.questionnaireEditController',
        'ngQuestionnaires.questionnaireDeleteController'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/questionnaires/show/:id', {
            templateUrl: 'questionnaires/questionnaire-show.tpl.html',
            controller: 'questionnaireShowController'
        });
        $routeProvider.when('/questionnaires/new', {
            templateUrl: 'questionnaires/questionnaire-edit.tpl.html',
            controller: 'questionnaireNewController'
        });
        $routeProvider.when('/questionnaires/edit/:id', {
            templateUrl: 'questionnaires/questionnaire-edit.tpl.html',
            controller: 'questionnaireEditController'
        });
        $routeProvider.when('/questionnaires/delete/:id', {
            templateUrl: 'questionnaires/questionnaire-delete.tpl.html',
            controller: 'questionnaireDeleteController'
        });
        $routeProvider.otherwise({redirectTo: '/questionnaires/list'});
    }])
    .controller('questionnaireListController', ['$scope', function ($scope) {
        $scope.questionnaires = [
            {
                id: 1,
                title: 'questionnaire 1',
                description: 'description for questionnaire 1',
                published: false,
                questions: [
                    1,
                    2,
                    3
                ],
                responses: [
                    1,
                    2,
                    3,
                    4
                ]
            },
            {
                id: 2,
                title: 'questionnaire 2',
                description: 'description for questionnaire 2',
                published: true,
                questions: [
                    1,
                    2
                ],
                responses: [
                    1,
                    2,
                    3
                ]
            },
            {
                id: 3,
                title: 'questionnaire 3',
                description: 'description for questionnaire 3',
                published: false,
                questions: [
                    1
                ],
                responses: [
                    1,
                    2
                ]
            }
        ];
    }]);
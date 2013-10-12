'use strict';

angular.module('ngQuestionnaires.questionListController', [
        'ngQuestionnaires.cacheService',
        'ngQuestionnaires.questionShowController',
        'ngQuestionnaires.questionNewController',
        'ngQuestionnaires.questionEditController',
        'ngQuestionnaires.questionDeleteController'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/questions/show/:id', {
            templateUrl: 'questions/question-show.tpl.html',
            controller: 'questionShowController'
        });
        $routeProvider.when('/questions/new', {
            templateUrl: 'questions/question-edit.tpl.html',
            controller: 'questionNewController'
        });
        $routeProvider.when('/questions/edit/:id', {
            templateUrl: 'questions/question-edit.tpl.html',
            controller: 'questionEditController'
        });
        $routeProvider.when('/questions/delete/:id', {
            templateUrl: 'questions/question-delete.tpl.html',
            controller: 'questionDeleteController'
        });
    }])
    .controller('questionListController', [
        '$scope',
        'cacheService',
        function ($scope, cacheService) {
            var getQuestions = function () {
                var qs = cacheService.get('questions');
                if (qs === undefined) {
                    qs = [
                        {
                            id: 1,
                            text: 'question guy 1',
                            choices: [
                                {
                                    id: 1,
                                    text: 'choice 1 of question 1',
                                    ordinal: 1
                                },
                                {
                                    id: 2,
                                    text: 'choice 2 of question 1',
                                    ordinal: 2
                                },
                                {
                                    id: 3,
                                    text: 'choice 3 of question 1',
                                    ordinal: 3
                                },
                                {
                                    id: 4,
                                    text: 'choice 4 of question 1',
                                    ordinal: 4
                                }
                            ],
                            questionnaires: [3],
                            answers: [1, 2, 3, 4]
                        },
                        {
                            id: 2,
                            text: 'question 2',
                            choices: [
                                {
                                    id: 5,
                                    text: 'choice 1 of question 2',
                                    ordinal: 1
                                },
                                {
                                    id: 6,
                                    text: 'choice 2 of question 2',
                                    ordinal: 2
                                },
                                {
                                    id: 7,
                                    text: 'choice 3 of question 2',
                                    ordinal: 3
                                },
                                {
                                    id: 8,
                                    text: 'choice 4 of question 2',
                                    ordinal: 4
                                }
                            ],
                            questionnaires: [2],
                            answers: [2, 3, 4]
                        },
                        {
                            id: 3,
                            text: 'question 3',
                            choices: [
                                {
                                    id: 9,
                                    text: 'choice 1 of question 3',
                                    ordinal: 1
                                },
                                {
                                    id: 10,
                                    text: 'choice 2 of guy question 3',
                                    ordinal: 2
                                },
                                {
                                    id: 11,
                                    text: 'choice 3 of question 3',
                                    ordinal: 3
                                },
                                {
                                    id: 12,
                                    text: 'choice 4 of question 3',
                                    ordinal: 4
                                }
                            ],
                            questionnaires: [1],
                            answers: [3, 4]
                        }
                    ];
                    cacheService.put('questions', qs);
                }
                return qs;
            };
            $scope.questions = getQuestions();

            $scope.isMatch = function (question) {
                return $scope.hasSearchQuery() ? (
                    question.text.indexOf($scope.search.query) > -1 ||
                        _.any(question.choices, function (choice) {
                            return choice.text.indexOf($scope.search.query) > -1;
                        })
                    ) : true;
            };

            $scope.hasSearchQuery = function () {
                return $scope.search.query;
            };
        }]);
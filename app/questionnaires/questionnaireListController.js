'use strict';

angular.module('ngQuestionnaires.questionnaireListController', [
        'ngQuestionnaires.cacheService',
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
    }])
    .controller('questionnaireListController', [
        '$scope',
        'cacheService',
        function ($scope, cacheService) {
            var getQuestionnaires = function () {
                var qs = cacheService.get('questionnaires');
                if (qs === undefined) {
                    qs = [
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
                    ];
                    cacheService.put('questionnaires', qs);
                }
                return qs;
            };
            $scope.questionnaires = getQuestionnaires();

            $scope.isMatch = function (questionnaire) {
                return $scope.hasSearchQuery() ? (
                    questionnaire.title.indexOf($scope.search.query) > -1 ||
                        questionnaire.description.indexOf($scope.search.query) > -1
                    ) : true;
            };

            $scope.hasSearchQuery = function () {
                return $scope.search.query;
            };
        }]);
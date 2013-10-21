'use strict';

angular.module('ngQuestionnaires.questionnaireListController', [
        'ngQuestionnaires.questionnaireShowController',
        'ngQuestionnaires.questionnaireNewController',
        'ngQuestionnaires.questionnaireEditController',
        'ngQuestionnaires.questionnaireDeleteController',
        'ngQuestionnaires.responseNewController'
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
        $routeProvider.when('/responses/new/:id', {
            templateUrl: 'responses/response-new.tpl.html',
            controller: 'responseNewController'
        });
    }])
    .controller('questionnaireListController', [
        '$scope',
        '$filter',
        '$log',
        'questionnaireFactory',
        'pagination',
        function ($scope, $filter, $log, questionnaireFactory, pagination) {
            $scope.itemsPerPage = pagination.itemsPerPage;
            $scope.maxSize = pagination.maxSize;

            questionnaireFactory.query()
                .then(function (questionnaires) {
                    $scope.questionnaires = questionnaires;
                    $scope.$watch('search.query', function (value) {
                        $scope.page = 1;
                        if (value) {
                            $scope.filteredQuestionnaires = $filter('filter')($scope.questionnaires, value);
                        } else {
                            $scope.filteredQuestionnaires = questionnaires;
                        }
                        $scope.totalItems = $scope.filteredQuestionnaires.length;
                    });
                }, $scope.addErrorAlert);

            $scope.isMatch = function (questionnaire) {
                return $scope.search.query ? (
                    questionnaire.title.indexOf($scope.search.query) > -1 ||
                        questionnaire.description.indexOf($scope.search.query) > -1
                    ) : true;
            };
        }]);
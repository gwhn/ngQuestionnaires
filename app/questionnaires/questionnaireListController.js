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
        '$log',
        'questionnaireFactory',
        function ($scope, $log, questionnaireFactory) {
            questionnaireFactory.query().then(function (questionnaires) {
                $scope.questionnaires = questionnaires;
            }, $log.error);

            $scope.isMatch = function (questionnaire) {
                return $scope.search.query ? (
                    questionnaire.title.indexOf($scope.search.query) > -1 ||
                        questionnaire.description.indexOf($scope.search.query) > -1
                    ) : true;
            };
        }]);
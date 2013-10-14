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
        'fbUrl',
        'Firebase',
        'angularFireCollection',
        function ($scope, fbUrl, Firebase, angularFireCollection) {
            $scope.questionnaires = angularFireCollection(new Firebase(fbUrl + 'questionnaires'));

            $scope.isMatch = function (questionnaire) {
                return $scope.search.query ? (
                    questionnaire.title.indexOf($scope.search.query) > -1 ||
                        questionnaire.description.indexOf($scope.search.query) > -1
                    ) : true;
            };
        }]);
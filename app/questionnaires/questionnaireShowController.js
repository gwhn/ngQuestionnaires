'use strict';

angular.module('ngQuestionnaires.questionnaireShowController', [
        'ngQuestionnaires.questionShowController'
    ])
    .controller('questionnaireShowController', [
        '$scope',
        '$log',
        '$location',
        '$routeParams',
        'questionnaireFactory',
        function ($scope, $log, $location, $routeParams, questionnaireFactory) {
            questionnaireFactory.get($routeParams.id)
                .then(function (questionnaire) {
                    $scope.questionnaire = questionnaire;
                }, $scope.addErrorAlert);

            $scope.hasQuestions = function () {
                return $scope.questionnaire && $scope.questionnaire.questions;
            };

            $scope.back = function () {
                $location.url('/questionnaires/list');
            };
        }]);
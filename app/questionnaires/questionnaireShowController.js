'use strict';

angular.module('ngQuestionnaires.questionnaireShowController', [
        'ngQuestionnaires.questionShowController'
    ])
    .controller('questionnaireShowController', [
        '$scope',
        '$location',
        '$routeParams',
        'questionnaireFactory',
        function ($scope, $location, $routeParams, questionnaireFactory) {
            questionnaireFactory.get($routeParams.id).then(function (questionnaire) {
                $scope.questionnaire = questionnaire;
            });

            $scope.hasQuestions = function () {
                return $scope.questionnaire && $scope.questionnaire.questions;
            };

            $scope.back = function () {
                $location.url('/questionnaires/list');
            };
        }]);
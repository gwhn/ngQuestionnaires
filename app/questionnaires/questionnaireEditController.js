'use strict';

angular.module('ngQuestionnaires.questionnaireEditController', [])
    .controller('questionnaireEditController', [
        '$scope',
        '$cacheFactory',
        '$location',
        '$routeParams',
        'questionnaires',
        'questions',
        function ($scope, $cacheFactory, $location, $routeParams, questionnaires, questions) {
            var questionnaire = $cacheFactory.get('data').get('questionnaire'),
                navigate = function () {
                    $cacheFactory.get('data').remove('questionnaire');
                    $location.url('/questionnaires/list');
                };

            $scope.action = 'Edit';

            if (questionnaire !== undefined) {
                $scope.questionnaire = questionnaire;
                $cacheFactory.get('data').remove('questionnaire');
            }

            $scope.questions = questions;

            $scope.addQuestion = function () {
                $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
                $location.url('/questions/new?returnUrl=' + $location.url());
            };

            $scope.update = function () {
                questionnaires.update(angular.copy($scope.questionnaire));
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };
        }]);
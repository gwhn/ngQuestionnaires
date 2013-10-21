'use strict';

angular.module('ngQuestionnaires.questionnaireNewController', [])
    .controller('questionnaireNewController', [
        '$scope',
        '$log',
        '$cacheFactory',
        '$location',
        'questionnaireFactory',
        'questionFactory',
        function ($scope, $log, $cacheFactory, $location, questionnaireFactory, questionFactory) {
            var questionnaire = $cacheFactory.get('data').get('questionnaire');

            function navigate() {
                $cacheFactory.get('data').remove('questionnaire');
                $location.url('/questionnaires/list');
            }

            $scope.action = 'New';

            if (questionnaire !== undefined) {
                $scope.questionnaire = questionnaire;
                $cacheFactory.get('data').remove('questionnaire');
            }

            questionFactory.query()
                .then(function (questions) {
                    $scope.questions = questions;
                }, $scope.addErrorAlert);

            $scope.addQuestion = function () {
                $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
                $location.url('/questions/new?returnUrl=' + $location.url());
            };

            $scope.save = function () {
                questionnaireFactory.add($scope.questionnaire)
                    .then(function () {
                        $scope.addSuccessAlert($scope.questionnaire.title + ' saved successfully');
                    }, $scope.addErrorAlert)
                    .then(navigate);
            };

            $scope.cancel = navigate;
        }]);
'use strict';

angular.module('ngQuestionnaires.questionnaireNewController', [])
    .controller('questionnaireNewController', [
        '$scope',
        '$cacheFactory',
        '$location',
        'questionnaireFactory',
        'questionFactory',
        function ($scope, $cacheFactory, $location, questionnaireFactory, questionFactory) {
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

            questionFactory.query().then(function (questions) {
                $scope.questions = questions;
            });

            $scope.addQuestion = function () {
                $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
                $location.url('/questions/new?returnUrl=' + $location.url());
            };

            $scope.save = function () {
                questionnaireFactory.save($scope.questionnaire).then(navigate);
            };

            $scope.cancel = navigate;
        }]);
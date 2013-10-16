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

            questionFactory.query().then(function (questions) {
                $scope.questions = questions;
            }, $log.error);

            $scope.addQuestion = function () {
                $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
                $location.url('/questions/new?returnUrl=' + $location.url());
            };

            $scope.save = function () {
                questionnaireFactory.save($scope.questionnaire).then(navigate, $log.error);
            };

            $scope.cancel = navigate;
        }]);
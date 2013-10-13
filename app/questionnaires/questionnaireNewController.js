'use strict';

angular.module('ngQuestionnaires.questionnaireNewController', [
        'ng'
    ])
    .controller('questionnaireNewController', [
        '$scope',
        '$cacheFactory',
        '$location',
        function ($scope, $cacheFactory, $location) {
            $scope.action = 'New';

            var questionnaire = $cacheFactory.get('data').get('questionnaire');
            if (questionnaire !== undefined) {
                $scope.questionnaire = questionnaire;
                $cacheFactory.get('data').remove('questionnaire');
            }

            $scope.questions = $cacheFactory.get('data').get('questions');

            $scope.addQuestion = function () {
                $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
                $cacheFactory.get('data').put('returnTo', $location.url());
                $location.url('/questions/new');
            };
        }]);
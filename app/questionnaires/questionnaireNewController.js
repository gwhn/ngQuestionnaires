'use strict';

angular.module('ngQuestionnaires.questionnaireNewController', [
        'ng',
        'ngQuestionnaires.firebaseFactories'
    ])
    .controller('questionnaireNewController', [
        '$scope',
        '$cacheFactory',
        '$location',
        'questionnaires',
        'questions',
        function ($scope, $cacheFactory, $location, questionnaires, questions) {
            $scope.action = 'New';

            var questionnaire = $cacheFactory.get('data').get('questionnaire');
            if (questionnaire !== undefined) {
                $scope.questionnaire = questionnaire;
                $cacheFactory.get('data').remove('questionnaire');
            }

            $scope.questions = questions;

            $scope.addQuestion = function () {
                $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
                $location.url('/questions/new?returnUrl=' + $location.url());
            };

            var navigate = function () {
                $cacheFactory.get('data').remove('questionnaire');
                $location.url('/questionnaires/list');
            };

            $scope.save = function () {
                questionnaires.add(angular.copy($scope.questionnaire));
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };
        }]);
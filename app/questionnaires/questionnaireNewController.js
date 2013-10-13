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
                $location.url('/questions/new?returnUrl=' + $location.url());
            };

            var navigate = function () {
                $location.url('/questionnaires/list');
            };

            $scope.save = function () {
                var questionnaires = $cacheFactory.get('data').get('questionnaires'),
                    max = _.max(questionnaires, function (questionnaire) {
                        return questionnaire.id;
                    });
                questionnaires.push({
                    id: max.id + 1,
                    title: $scope.questionnaire.title,
                    description: $scope.questionnaire.description,
                    published: $scope.questionnaire.published,
                    questions: $scope.questionnaire.questions
                });
                $cacheFactory.get('data').put('questionnaires', questionnaires);
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };
        }]);
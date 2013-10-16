'use strict';

angular.module('ngQuestionnaires.questionnaireEditController', [])
    .controller('questionnaireEditController', [
        '$scope',
        '$cacheFactory',
        '$location',
        '$routeParams',
        'questionnaireFactory',
        'questionFactory',
        function ($scope, $cacheFactory, $location, $routeParams, questionnaireFactory, questionFactory) {
            var questionnaire = $cacheFactory.get('data').get('questionnaire'),
                original;

            function navigate() {
                $cacheFactory.get('data').remove('questionnaire');
                $location.url('/questionnaires/list');
            }

            $scope.action = 'Edit';

            if (questionnaire === undefined) {
                questionnaireFactory.get($routeParams.id).then(function (questionnaire) {
                    $scope.questionnaire = questionnaire;
                    original = angular.copy($scope.questionnaire);
                });
            } else {
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

            $scope.update = function () {
                questionnaireFactory.update($routeParams.id, $scope.questionnaire).then(navigate);
            };

            $scope.cancel = function () {
                $scope.questionnaire = angular.copy(original);
                navigate();
            };
        }]);
'use strict';

angular.module('ngQuestionnaires.questionnaireDeleteController', [])
    .controller('questionnaireDeleteController', [
        '$scope',
        '$location',
        '$routeParams',
        'questionnaireFactory',
        function ($scope, $location, $routeParams, questionnaireFactory) {
            function navigate() {
                $location.url('/questionnaires/list');
            }

            questionnaireFactory.get($routeParams.id).then(function (questionnaire) {
                $scope.questionnaire = questionnaire;
            });

            $scope.remove = function () {
                questionnaireFactory.remove($routeParams.id).then(navigate);
            };

            $scope.cancel = navigate;
        }]);
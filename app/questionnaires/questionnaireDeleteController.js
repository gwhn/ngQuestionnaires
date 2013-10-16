'use strict';

angular.module('ngQuestionnaires.questionnaireDeleteController', [])
    .controller('questionnaireDeleteController', [
        '$scope',
        '$log',
        '$location',
        '$routeParams',
        'questionnaireFactory',
        function ($scope, $log, $location, $routeParams, questionnaireFactory) {
            function navigate() {
                $location.url('/questionnaires/list');
            }

            questionnaireFactory.get($routeParams.id).then(function (questionnaire) {
                $scope.questionnaire = questionnaire;
            }, $log.error);

            $scope.remove = function () {
                questionnaireFactory.remove($routeParams.id).then(navigate, $log.error);
            };

            $scope.cancel = navigate;
        }]);
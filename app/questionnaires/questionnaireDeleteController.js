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
            }, $scope.addErrorAlert);

            $scope.remove = function () {
                questionnaireFactory.remove($routeParams.id)
                    .then(function () {
                        $scope.addSuccessAlert($scope.questionnaire.title + ' deleted successfully');
                    }, $scope.addErrorAlert)
                    .then(navigate);
            };

            $scope.cancel = navigate;
        }]);
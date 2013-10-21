'use strict';

angular.module('ngQuestionnaires.questionDeleteController', [])
    .controller('questionDeleteController', [
        '$scope',
        '$log',
        '$location',
        '$routeParams',
        'questionFactory',
        function ($scope, $log, $location, $routeParams, questionFactory) {
            function navigate() {
                $location.url('/questions/list');
            }

            questionFactory.get($routeParams.id)
                .then(function (question) {
                    $scope.question = question;
                });

            $scope.remove = function () {
                questionFactory.remove($routeParams.id)
                    .then(function () {
                        $scope.addSuccessAlert($scope.question.text + ' deleted successfully');
                    }, $scope.addErrorAlert)
                    .then(navigate);
            };

            $scope.cancel = navigate;
        }]);
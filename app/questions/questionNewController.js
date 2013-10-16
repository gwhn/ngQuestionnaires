'use strict';

angular.module('ngQuestionnaires.questionNewController', [])
    .controller('questionNewController', [
        '$scope',
        '$log',
        '$location',
        '$routeParams',
        'questionFactory',
        function ($scope, $log, $location, $routeParams, questionFactory) {
            function navigate() {
                var returnUrl = $routeParams.returnUrl;
                if (returnUrl === undefined) {
                    $location.url('/questions/list');
                } else {
                    $location.url(returnUrl);
                }
            }

            $scope.action = 'New';

            $scope.question = {
                choices: []
            };

            $scope.returnUrl = $routeParams.returnUrl;

            $scope.removeChoice = function (index) {
                $scope.question.choices.splice(index, 1);
            };

            $scope.addChoice = function () {
                $scope.question.choices.push({text: ''});
            };

            $scope.save = function () {
                questionFactory.add($scope.question).then(navigate, $log.error);
            };

            $scope.cancel = navigate;
        }]);
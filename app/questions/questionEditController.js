'use strict';

angular.module('ngQuestionnaires.questionEditController', [])
    .controller('questionEditController', [
        '$scope',
        '$location',
        '$routeParams',
        'questionFactory',
        function ($scope, $location, $routeParams, questionFactory) {
            var original;

            function navigate() {
                $location.url('/questions/list');
            }

            $scope.action = 'Edit';

            questionFactory.get($routeParams.id).then(function (question) {
                $scope.question = question;
                original = angular.copy($scope.question);
            });

            $scope.removeChoice = function (index) {
                $scope.question.choices.splice(index, 1);
            };

            $scope.addChoice = function () {
                if ($scope.question.choices === undefined) {
                    $scope.question.choices = [];
                }
                $scope.question.choices.push({text: ''});
            };

            $scope.update = function () {
                questionFactory.update($routeParams.id, $scope.question).then(navigate);
            };

            $scope.cancel = function () {
                $scope.question = angular.copy(original);
                navigate();
            };
        }]);
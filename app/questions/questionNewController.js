'use strict';

angular.module('ngQuestionnaires.questionNewController', [
        'ngQuestionnaires.firebaseFactories',
    ])
    .controller('questionNewController', [
        '$scope',
        '$location',
        '$routeParams',
        'questions',
        function ($scope, $location, $routeParams, questions) {
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

            var navigate = function () {
                var returnUrl = $routeParams.returnUrl;
                if (returnUrl === undefined) {
                    $location.url('/questions/list');
                } else {
                    $location.url(returnUrl);
                }
            };

            $scope.save = function () {
                questions.add(angular.copy($scope.question));
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };
        }]);
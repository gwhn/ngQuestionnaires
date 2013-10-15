'use strict';

angular.module('ngQuestionnaires.questionEditController', [])
    .controller('questionEditController', [
        '$scope',
        '$location',
        '$routeParams',
        'fbUrl',
        'Firebase',
        'angularFire',
        function ($scope, $location, $routeParams, fbUrl, Firebase, angularFire) {
            var ref = new Firebase(fbUrl + 'questions/' + $routeParams.id),
                original = null;

            function navigate() {
                $location.url('/questions/list');
            }

            $scope.action = 'Edit';

            angularFire(ref, $scope, 'question')
                .then(function () {
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
                ref.set($scope.question);
                navigate();
            };

            $scope.cancel = function () {
                $scope.question = angular.copy(original);
                navigate();
            };
        }]);
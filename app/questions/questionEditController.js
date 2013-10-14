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
            var ref = new Firebase(fbUrl + 'questions/' + $routeParams.id);

            function navigate() {
                $location.url('/questions/list');
            }

            $scope.action = 'Edit';

            angularFire(ref, $scope, 'question');

            $scope.removeChoice = function (index) {
                $scope.question.choices.splice(index, 1);
            };

            $scope.addChoice = function () {
                $scope.question.choices.push({text: ''});
            };

            $scope.update = function () {
                ref.set($scope.question);
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };
        }]);
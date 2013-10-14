'use strict';

angular.module('ngQuestionnaires.questionNewController', [])
    .controller('questionNewController', [
        '$scope',
        '$location',
        '$routeParams',
        'fbUrl',
        'Firebase',
        'angularFireCollection',
        function ($scope, $location, $routeParams, fbUrl, Firebase, angularFireCollection) {
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
                angularFireCollection(new Firebase(fbUrl + 'questions'))
                    .add(angular.copy($scope.question));
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };

            $scope.canSave = function () {
                return $scope.questionForm.$dirty && $scope.questionForm.$valid;
            };

            $scope.getCssClasses = function (ngModelController) {
                return {
                    'has-error': ngModelController.$invalid && ngModelController.$dirty,
                    'has-success': ngModelController.$valid && ngModelController.$dirty
                };
            };
        }]);
'use strict';

angular.module('ngQuestionnaires.questionDeleteController', [])
    .controller('questionDeleteController', [
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

            angularFire(ref, $scope, 'question');

            $scope.delete = function () {
                ref.remove();
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };
        }]);
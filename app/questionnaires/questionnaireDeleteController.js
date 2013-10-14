'use strict';

angular.module('ngQuestionnaires.questionnaireDeleteController', [])
    .controller('questionnaireDeleteController', [
        '$scope',
        '$location',
        '$routeParams',
        'fbUrl',
        'Firebase',
        'angularFire',
        function ($scope, $location, $routeParams, fbUrl, Firebase, angularFire) {
            var ref = new Firebase(fbUrl + 'questionnaires/' + $routeParams.id);

            function navigate() {
                $location.url('/questionnaires/list');
            }

            angularFire(ref, $scope, 'questionnaire');

            $scope.delete = function () {
                ref.remove();
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };
        }]);
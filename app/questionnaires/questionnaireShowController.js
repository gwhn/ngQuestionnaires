'use strict';

angular.module('ngQuestionnaires.questionnaireShowController', [
        'ngQuestionnaires.questionShowController'
    ])
    .controller('questionnaireShowController', [
        '$scope',
        '$location',
        '$routeParams',
        'fbUrl',
        'Firebase',
        'angularFire',
        function ($scope, $location, $routeParams, fbUrl, Firebase, angularFire) {
            angularFire(new Firebase(fbUrl + 'questionnaires/' + $routeParams.id), $scope, 'questionnaire');

            $scope.hasQuestions = function () {
                return $scope.questionnaire && $scope.questionnaire.questions;
            };

            $scope.back = function () {
                $location.url('/questionnaires/list');
            };
        }]);
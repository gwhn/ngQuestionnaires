'use strict';

angular.module('ngQuestionnaires.questionShowController', [])
    .controller('questionShowController', [
        '$scope',
        '$log',
        'questionFactory',
        function ($scope, $log, questionFactory) {
            questionFactory.get($scope.question)
                .then(function (question) {
                    $scope.question = question;
                }, $scope.addErrorAlert);
        }]);
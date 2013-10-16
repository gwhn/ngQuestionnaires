'use strict';

angular.module('ngQuestionnaires.questionShowController', [])
    .controller('questionShowController', [
        '$scope',
        'questionFactory',
        function ($scope, questionFactory) {
            questionFactory.get($scope.question).then(function (question) {
                $scope.question = question;
            });
        }]);
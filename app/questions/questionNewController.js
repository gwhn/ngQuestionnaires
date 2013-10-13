'use strict';

angular.module('ngQuestionnaires.questionNewController', [
        'ng'
    ])
    .controller('questionNewController', [
        '$scope',
        function ($scope) {
            $scope.action = 'New';

            $scope.question = {
                choices: []
            };

            $scope.removeChoice = function (index) {
                $scope.question.choices.splice(index, 1);
            };

            $scope.addChoice = function () {
                $scope.question.choices.push({text: ''});
            };
        }]);
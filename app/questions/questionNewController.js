'use strict';

angular.module('ngQuestionnaires.questionNewController', [
        'ng'
    ])
    .controller('questionNewController', [
        '$scope',
        '$location',
        '$routeParams',
        '$cacheFactory',
        function ($scope, $location, $routeParams, $cacheFactory) {
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
                var questions = $cacheFactory.get('data').get('questions'),
                    max = _.max(questions, function (question) {
                        return question.id;
                    });
                questions.push({
                    id: max.id + 1,
                    text: $scope.question.text,
                    choices: $scope.question.choices
                });
                $cacheFactory.get('data').put('questions', questions);
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };
        }]);
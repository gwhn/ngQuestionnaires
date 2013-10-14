'use strict';

angular.module('ngQuestionnaires.responseNewController', [])
    .controller('responseNewController', [
        '$scope',
        '$location',
        '$routeParams',
        'fbUrl',
        'Firebase',
        'angularFire',
        'angularFireCollection',
        function ($scope, $location, $routeParams, fbUrl, Firebase, angularFire, angularFireCollection) {
            var ref = new Firebase(fbUrl + 'questionnaires/' + $routeParams.id),
                response = {answers: {}};

            function navigate() {
                $location.url('/questionnaires/list');
            }

            angularFire(ref, $scope, 'questionnaire');

            $scope.answer = function (question, choice) {
                response.answers[question] = choice;
            };

            $scope.submit = function () {
                var answers = [],
                    key;
                for (key in response.answers) {
                    if (response.answers.hasOwnProperty(key)) {
                        answers.push({
                            question: key,
                            choice: response.answers[key]
                        });
                    }
                }
                angularFireCollection(new Firebase(fbUrl + 'responses'))
                    .add({
                        respondent: $scope.respondent,
                        answers: answers
                    });
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };
        }]);
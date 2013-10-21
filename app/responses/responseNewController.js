'use strict';

angular.module('ngQuestionnaires.responseNewController', [])
    .controller('responseNewController', [
        '$scope',
        '$log',
        '$location',
        '$routeParams',
        'questionnaireFactory',
        'responseFactory',
        function ($scope, $log, $location, $routeParams, questionnaireFactory, responseFactory) {
            var response = {answers: {}};

            function navigate() {
                $location.url('/questionnaires/list');
            }

            questionnaireFactory.get($routeParams.id)
                .then(function (questionnaire) {
                    $scope.questionnaire = questionnaire;
                }, $scope.addErrorAlert);

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
                responseFactory.add({
                    respondent: $scope.respondent,
                    questionnaire: $scope.questionnaire.title,
                    answers: answers
                }).then(function () {
                    $scope.addSuccessAlert('Response from ' + $scope.respondent + ' on ' +
                        $scope.questionnaire.title + ' saved successfully');
                }, $scope.addErrorAlert).then(navigate);
            };

            $scope.cancel = navigate;
        }]);
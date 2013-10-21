'use strict';

angular.module('ngQuestionnaires.responseDeleteController', [])
    .controller('responseDeleteController', [
        '$scope',
        '$log',
        '$location',
        '$routeParams',
        'responseFactory',
        function ($scope, $log, $location, $routeParams, responseFactory) {
            function navigate() {
                $location.url('/responses/list');
            }

            responseFactory.get($routeParams.id)
                .then(function (response) {
                    $scope.response = response;
                }, $scope.addErrorAlert);

            $scope.remove = function () {
                responseFactory.remove($routeParams.id)
                    .then(function () {
                        $scope.addSuccessAlert('Response from ' + $scope.response.respondent +
                            ' on ' + $scope.response.questionnaire + ' deleted successfully');
                    }, $scope.addErrorAlert)
                    .then(navigate);
            };

            $scope.cancel = navigate;
        }]);
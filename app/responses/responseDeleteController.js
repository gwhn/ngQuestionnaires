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

            responseFactory.get($routeParams.id).then(function (response) {
                $scope.response = response;
            }, $log.error);

            $scope.remove = function () {
                responseFactory.remove($routeParams.id).then(navigate, $log.error);
            };

            $scope.cancel = navigate;
        }]);
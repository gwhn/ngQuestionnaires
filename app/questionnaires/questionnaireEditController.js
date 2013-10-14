'use strict';

angular.module('ngQuestionnaires.questionnaireEditController', [])
    .controller('questionnaireEditController', [
        '$scope',
        '$cacheFactory',
        '$location',
        '$routeParams',
        'fbUrl',
        'Firebase',
        'angularFire',
        'angularFireCollection',
        function ($scope, $cacheFactory, $location, $routeParams, fbUrl, Firebase, angularFire, angularFireCollection) {
            var questionnaire = $cacheFactory.get('data').get('questionnaire'),
                ref = new Firebase(fbUrl + 'questionnaires/' + $routeParams.id),
                original = null;

            function navigate() {
                $cacheFactory.get('data').remove('questionnaire');
                $location.url('/questionnaires/list');
            }

            $scope.action = 'Edit';

            if (questionnaire === undefined) {
                angularFire(ref, $scope, 'questionnaire')
                    .then(function () {
                        original = angular.copy($scope.questionnaire);
                    });
            } else {
                $scope.questionnaire = questionnaire;
                $cacheFactory.get('data').remove('questionnaire');
            }

            $scope.questions = angularFireCollection(new Firebase(fbUrl + 'questions'));

            $scope.addQuestion = function () {
                $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
                $location.url('/questions/new?returnUrl=' + $location.url());
            };

            $scope.update = function () {
                ref.set($scope.questionnaire);
                navigate();
            };

            $scope.cancel = function () {
                $scope.questionnaire = angular.copy(original);
                navigate();
            };

            $scope.canUpdate = function () {
                return $scope.questionnaireForm.$dirty && $scope.questionnaireForm.$valid;
            };

            $scope.getCssClasses = function (ngModelController) {
                return {
                    'has-error': ngModelController.$invalid && ngModelController.$dirty,
                    'has-success': ngModelController.$valid && ngModelController.$dirty
                };
            };
        }]);
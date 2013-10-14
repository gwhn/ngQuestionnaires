'use strict';

angular.module('ngQuestionnaires.questionnaireNewController', [])
    .controller('questionnaireNewController', [
        '$scope',
        '$cacheFactory',
        '$location',
        'fbUrl',
        'Firebase',
        'angularFireCollection',
        function ($scope, $cacheFactory, $location, fbUrl, Firebase, angularFireCollection) {
            var questionnaire = $cacheFactory.get('data').get('questionnaire');

            function navigate() {
                $cacheFactory.get('data').remove('questionnaire');
                $location.url('/questionnaires/list');
            }

            $scope.action = 'New';

            if (questionnaire !== undefined) {
                $scope.questionnaire = questionnaire;
                $cacheFactory.get('data').remove('questionnaire');
            }

            $scope.questions = angularFireCollection(new Firebase(fbUrl + 'questions'));

            $scope.addQuestion = function () {
                $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
                $location.url('/questions/new?returnUrl=' + $location.url());
            };

            $scope.save = function () {
                angularFireCollection(new Firebase(fbUrl + 'questionnaires'))
                    .add(angular.copy($scope.questionnaire));
                navigate();
            };

            $scope.cancel = function () {
                navigate();
            };

            $scope.canSave = function () {
                return $scope.questionnaireForm.$dirty && $scope.questionnaireForm.$valid;
            };

            $scope.getCssClasses = function (ngModelController) {
                return {
                    'has-error': ngModelController.$invalid && ngModelController.$dirty,
                    'has-success': ngModelController.$valid && ngModelController.$dirty
                };
            };
        }]);
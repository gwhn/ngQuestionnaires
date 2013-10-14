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
                ref = new Firebase(fbUrl + 'questionnaires/' + $routeParams.id);

            function navigate() {
                $cacheFactory.get('data').remove('questionnaire');
                $location.url('/questionnaires/list');
            }

            $scope.action = 'Edit';

            if (questionnaire === undefined) {
                angularFire(ref, $scope, 'questionnaire');
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
                navigate();
            };
        }]);
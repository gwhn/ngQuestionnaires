'use strict';

angular.module('ngQuestionnaires.questionShowController', [])
    .controller('questionShowController', [
        '$scope',
        'fbUrl',
        'Firebase',
        'angularFire',
        function ($scope, fbUrl, Firebase, angularFire) {
            angularFire(new Firebase(fbUrl + 'questions/' + $scope.question), $scope, 'question');
        }]);
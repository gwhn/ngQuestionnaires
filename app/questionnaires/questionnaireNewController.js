'use strict';

angular.module('ngQuestionnaires.questionnaireNewController', [
        'ngQuestionnaires.cacheService'
    ])
    .controller('questionnaireNewController', [
        '$scope',
        'cacheService',
        function ($scope, cacheService) {
            $scope.action = 'New';

            $scope.questions = cacheService.get('questions');
        }]);
'use strict';

angular.module('ngQuestionnaires.questionnaireNewController', [
        'ng'
    ])
    .controller('questionnaireNewController', [
        '$scope',
        '$cacheFactory',
        function ($scope, $cacheFactory) {
            $scope.action = 'New';

            $scope.questions = $cacheFactory.get('data').get('questions');

            $scope.addQuestion = function () {
                // store questionnaire inputs in cache service
                // store return to new questionnaire in cache service
                // navigate to new question form
                // on save new question,
                //  persist state and check for return to value in cache service,
                //  then navigate there
                // on cancel new question,
                //  check for return to value in cache service,
                //  then navigate there
                // on returning to new questionnaire form,
                //  check cache service for questionnaire inputs and display them,
                //  then remove from cache service
            };
        }]);
'use strict';

angular.module('ngQuestionnaires.responseListController', [])
    .controller('responseListController', [
        '$scope',
        'fbUrl',
        'Firebase',
        'angularFireCollection',
        function ($scope, fbUrl, Firebase, angularFireCollection) {
            $scope.responses = angularFireCollection(new Firebase(fbUrl + 'responses'));

            $scope.isMatch = function (response) {
                return $scope.search.query ? (
                    response.questionnaire.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
                        response.respondent.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
                        _.any(response.answers, function (answer) {
                            return answer.question.indexOf($scope.search.query.toLowerCase()) > -1 ||
                                answer.choice.indexOf($scope.search.query.toLowerCase()) > -1;
                        })
                    ) : true;
            };
        }]);
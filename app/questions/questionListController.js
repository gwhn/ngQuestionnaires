'use strict';

angular.module('ngQuestionnaires.questionListController', [
        'ngQuestionnaires.questionNewController',
        'ngQuestionnaires.questionEditController',
        'ngQuestionnaires.questionDeleteController'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/questions/show/:id', {
            templateUrl: 'questions/question-show.tpl.html',
            controller: 'questionShowController'
        });
        $routeProvider.when('/questions/new', {
            templateUrl: 'questions/question-edit.tpl.html',
            controller: 'questionNewController'
        });
        $routeProvider.when('/questions/edit/:id', {
            templateUrl: 'questions/question-edit.tpl.html',
            controller: 'questionEditController'
        });
        $routeProvider.when('/questions/delete/:id', {
            templateUrl: 'questions/question-delete.tpl.html',
            controller: 'questionDeleteController'
        });
    }])
    .controller('questionListController', [
        '$scope',
        'fbUrl',
        'Firebase',
        'angularFireCollection',
        function ($scope, fbUrl, Firebase, angularFireCollection) {
            $scope.questions = angularFireCollection(new Firebase(fbUrl + 'questions'));

            $scope.isMatch = function (question) {
                return $scope.search.query ? (
                    question.text.indexOf($scope.search.query) > -1 ||
                        _.any(question.choices, function (choice) {
                            return choice.text.indexOf($scope.search.query) > -1;
                        })
                    ) : true;
            };
        }]);
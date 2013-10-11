'use strict';

angular.module('ngQuestionnaires.questionnaireListController', [])
    .controller('questionnaireListController', ['$scope', function ($scope) {
        $scope.questionnaires = [
            {
                id: 1,
                title: 'questionnaire 1',
                description: 'description for questionnaire 1',
                published: false,
                questions: [
                    1,
                    2,
                    3
                ],
                responses: [
                    1,
                    2,
                    3,
                    4
                ]
            },
            {
                id: 2,
                title: 'questionnaire 2',
                description: 'description for questionnaire 2',
                published: true,
                questions: [
                    1,
                    2
                ],
                responses: [
                    1,
                    2,
                    3
                ]
            },
            {
                id: 3,
                title: 'questionnaire 3',
                description: 'description for questionnaire 3',
                published: false,
                questions: [
                    1
                ],
                responses: [
                    1,
                    2
                ]
            }
        ];
    }]);
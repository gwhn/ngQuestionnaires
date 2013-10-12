'use strict';

angular.module('ngQuestionnaires.cacheService', ['ng'])
    .factory('cacheService', function ($cacheFactory) {
        var svc = $cacheFactory('cacheService');

        if (svc.get('questionnaires') === undefined) {
            svc.put('questionnaires', [
                {
                    id: 1,
                    title: 'questionnaire 1',
                    description: 'description for questionnaire 1',
                    published: false,
                    questions: [1, 2, 3],
                    responses: [1, 2, 3, 4]
                },
                {
                    id: 2,
                    title: 'questionnaire guy 2',
                    description: 'description for questionnaire 2',
                    published: true,
                    questions: [1, 2],
                    responses: [1, 2, 3]
                },
                {
                    id: 3,
                    title: 'questionnaire 3',
                    description: 'description for questionnaire 3',
                    published: false,
                    questions: [1],
                    responses: [1, 2]
                }
            ]);
        }

        if (svc.get('questions') === undefined) {
            svc.put('questions', [
                {
                    id: 1,
                    text: 'question guy 1',
                    choices: [
                        {
                            id: 1,
                            text: 'choice 1 of question 1',
                            ordinal: 1
                        },
                        {
                            id: 2,
                            text: 'choice 2 of question 1',
                            ordinal: 2
                        },
                        {
                            id: 3,
                            text: 'choice 3 of question 1',
                            ordinal: 3
                        },
                        {
                            id: 4,
                            text: 'choice 4 of question 1',
                            ordinal: 4
                        }
                    ],
                    questionnaires: [3],
                    answers: [1, 2, 3, 4]
                },
                {
                    id: 2,
                    text: 'question 2',
                    choices: [
                        {
                            id: 5,
                            text: 'choice 1 of question 2',
                            ordinal: 1
                        },
                        {
                            id: 6,
                            text: 'choice 2 of question 2',
                            ordinal: 2
                        },
                        {
                            id: 7,
                            text: 'choice 3 of question 2',
                            ordinal: 3
                        },
                        {
                            id: 8,
                            text: 'choice 4 of question 2',
                            ordinal: 4
                        }
                    ],
                    questionnaires: [2],
                    answers: [2, 3, 4]
                },
                {
                    id: 3,
                    text: 'question 3',
                    choices: [
                        {
                            id: 9,
                            text: 'choice 1 of question 3',
                            ordinal: 1
                        },
                        {
                            id: 10,
                            text: 'choice 2 of guy question 3',
                            ordinal: 2
                        },
                        {
                            id: 11,
                            text: 'choice 3 of question 3',
                            ordinal: 3
                        },
                        {
                            id: 12,
                            text: 'choice 4 of question 3',
                            ordinal: 4
                        }
                    ],
                    questionnaires: [1],
                    answers: [3, 4]
                }
            ]);
        }

        return svc;
    });
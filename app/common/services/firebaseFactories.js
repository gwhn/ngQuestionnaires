'use strict';

angular.module('ngQuestionnaires.firebaseFactories', [
        'firebase'
    ])
    .factory('questionnaires', [
        'fbUrl',
        'angularFireCollection',
        function (fbUrl, angularFireCollection) {
            return angularFireCollection(new Firebase(fbUrl + 'questionnaires'));
        }]
    )
    .factory('questions', [
        'fbUrl',
        'angularFireCollection',
        function (fbUrl, angularFireCollection) {
            return angularFireCollection(new Firebase(fbUrl + 'questions'));
        }]
    )
    .factory('responses', [
        'fbUrl',
        'angularFireCollection',
        function (fbUrl, angularFireCollection) {
            return angularFireCollection(new Firebase(fbUrl + 'responses'));
        }]
    );
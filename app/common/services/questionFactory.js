'use strict';

angular.module('ngQuestionnaires.questionFactory', [])
    .factory('questionFactory', [
        '$q',
        'fbUrl',
        'Firebase',
        function ($q, fbUrl, Firebase) {
            var ref = new Firebase(fbUrl + 'questions');
            return {
                query: function (options) {
                    var deferred = $q.defer();
                    deferred.reject('questionFactory.query not implemented');
                    return deferred.promise;
                },
                get: function (id) {
                    var deferred = $q.defer();
                    deferred.reject('questionFactory.get not implemented');
                    return deferred.promise;
                },
                add: function (question) {
                    var deferred = $q.defer();
                    deferred.reject('questionFactory.add not implemented');
                    return deferred.promise;
                },
                update: function (id, question) {
                    var deferred = $q.defer();
                    deferred.reject('questionFactory.update not implemented');
                    return deferred.promise;
                },
                remove: function (id) {
                    var deferred = $q.defer();
                    deferred.reject('questionFactory.remove not implemented');
                    return deferred.promise;
                }
            };
        }]);
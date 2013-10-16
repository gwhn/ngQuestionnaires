'use strict';

angular.module('ngQuestionnaires.questionnaireFactory', [])
    .factory('questionnaireFactory', [
        '$q',
        'fbUrl',
        'Firebase',
        function ($q, fbUrl, Firebase) {
            var ref = new Firebase(fbUrl + 'questionnaires');
            return {
                query: function (options) {
                    var deferred = $q.defer();
                    deferred.reject('questionnaireFactory.query not implemented');
                    return deferred.promise;
                },
                get: function (id) {
                    var deferred = $q.defer();
                    deferred.reject('questionnaireFactory.get not implemented');
                    return deferred.promise;
                },
                add: function (question) {
                    var deferred = $q.defer();
                    deferred.reject('questionnaireFactory.add not implemented');
                    return deferred.promise;
                },
                update: function (id, question) {
                    var deferred = $q.defer();
                    deferred.reject('questionnaireFactory.update not implemented');
                    return deferred.promise;
                },
                remove: function (id) {
                    var deferred = $q.defer();
                    deferred.reject('questionnaireFactory.remove not implemented');
                    return deferred.promise;
                }
            };
        }]);
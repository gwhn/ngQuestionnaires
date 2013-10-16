'use strict';

angular.module('ngQuestionnaires.responseFactory', [])
    .factory('responseFactory', [
        '$q',
        'fbUrl',
        'Firebase',
        function ($q, fbUrl, Firebase) {
            var ref = new Firebase(fbUrl + 'responses');
            return {
                query: function (options) {
                    var deferred = $q.defer();
                    deferred.reject('responseFactory.query not implemented');
                    return deferred.promise;
                },
                get: function (id) {
                    var deferred = $q.defer();
                    deferred.reject('responseFactory.get not implemented');
                    return deferred.promise;
                },
                add: function (question) {
                    var deferred = $q.defer();
                    deferred.reject('responseFactory.add not implemented');
                    return deferred.promise;
                },
                update: function (id, question) {
                    var deferred = $q.defer();
                    deferred.reject('responseFactory.update not implemented');
                    return deferred.promise;
                },
                remove: function (id) {
                    var deferred = $q.defer();
                    deferred.reject('responseFactory.remove not implemented');
                    return deferred.promise;
                }
            };
        }]);
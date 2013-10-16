'use strict';

angular.module('ngQuestionnaires.responseFactory', [])
    .factory('responseFactory', [
        '$q',
        'fbUrl',
        'Firebase',
        function ($q, fbUrl, Firebase) {
            return {
                query: function (options) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'responses');
                    ref.once('value', function (snapshot) {
                        var value = snapshot.val(),
                            data = [],
                            key;
                        for (key in value) {
                            if (value.hasOwnProperty(key)) {
                                data.push(angular.extend(value[key], {id: key}));
                            }
                        }
                        def.resolve(data);
                    }, function () {
                        def.reject('Failed to query responses');
                    });
                    return def.promise;
                },
                get: function (id) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'responses/' + id);
                    ref.once('value', function (snapshot) {
                        def.resolve(snapshot.val());
                    }, function () {
                        def.reject('Failed to get response');
                    });
                    return def.promise;
                },
                add: function (question) {
                    var def = $q.defer();
//                    def.reject('responseFactory.add not implemented');
                    return def.promise;
                },
                update: function (id, question) {
                    var def = $q.defer();
//                    def.reject('responseFactory.update not implemented');
                    return def.promise;
                },
                remove: function (id) {
                    var def = $q.defer();
//                    def.reject('responseFactory.remove not implemented');
                    return def.promise;
                }
            };
        }]);
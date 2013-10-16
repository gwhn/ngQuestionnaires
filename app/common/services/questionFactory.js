'use strict';

angular.module('ngQuestionnaires.questionFactory', [])
    .factory('questionFactory', [
        '$q',
        'fbUrl',
        'Firebase',
        function ($q, fbUrl, Firebase) {
            return {
                query: function (options) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questions');
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
                        def.reject('Failed to query questions');
                    });
                    return def.promise;
                },
                get: function (id) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questions/' + id);
                    ref.once('value', function (snapshot) {
                        def.resolve(snapshot.val());
                    }, function () {
                        def.reject('Failed to get question');
                    });
                    return def.promise;
                },
                add: function (question) {
                    var def = $q.defer();
//                    def.reject('questionFactory.add not implemented');
                    return def.promise;
                },
                update: function (id, question) {
                    var def = $q.defer();
//                    def.reject('questionFactory.update not implemented');
                    return def.promise;
                },
                remove: function (id) {
                    var def = $q.defer();
//                    def.reject('questionFactory.remove not implemented');
                    return def.promise;
                }
            };
        }]);
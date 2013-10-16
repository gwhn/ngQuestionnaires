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
                        var value = snapshot.val(),
                            data = angular.extend(value, {id: id});
                        def.resolve(data);
                    }, function () {
                        def.reject('Failed to get question');
                    });
                    return def.promise;
                },
                add: function (data) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questions'),
                        obj = ref.push(data, function (err) {
                            if (err) {
                                def.reject('Failed to add question');
                            } else {
                                def.resolve(obj.name());
                            }
                        });
                    return def.promise;
                },
                update: function (id, data) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questions/' + id);
                    delete data.id;
                    ref.update(data, function (err) {
                        if (err) {
                            def.reject('Failed to update question');
                        } else {
                            def.resolve();
                        }
                    });
                    return def.promise;
                },
                remove: function (id) {
                    var def = $q.defer();
//                    def.reject('questionFactory.remove not implemented');
                    return def.promise;
                }
            };
        }]);
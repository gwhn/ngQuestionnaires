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
                        ref = new Firebase(fbUrl + 'questions'),
                        filter = function (collection, key, value) {
                            return _.filter(collection, function (item) {
                                return item[key] === value;
                            });
                        };
                    ref.once('value', function (snapshot) {
                        var value = snapshot.val(),
                            data = [],
                            key;
                        if (options) {
                            for (key in options) {
                                if (options.hasOwnProperty(key)) {
                                    value = filter(value, key, options[key]);
                                }
                            }
                        }
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
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questions/' + id),
                        removeRelatives = function (id) {
                            new Firebase(fbUrl + 'questionnaires').once('value', function (snapshot) {
                                var value = snapshot.val(),
                                    key,
                                    i,
                                    n;
                                for (key in value) {
                                    if (value.hasOwnProperty(key) && value[key].questions) {
                                        n = value[key].questions.length;
                                        for (i = 0; i < n; i += 1) {
                                            if (value[key].questions[i] === id) {
                                                value[key].questions.splice(i, 1);
                                                break;
                                            }
                                        }
                                        new Firebase(fbUrl + 'questionnaires/' + key).update(value[key]);
                                    }
                                }
                            });
                        };
                    ref.remove(function (err) {
                        if (err) {
                            def.reject('Failed to remove question');
                        } else {
                            removeRelatives(id);
                            def.resolve();
                        }
                    });
                    return def.promise;
                }
            };
        }]);
'use strict';

angular.module('ngQuestionnaires.questionFactory', [])
    .factory('questionFactory', [
        '$q',
        'fbUrl',
        'Firebase',
        function ($q, fbUrl, Firebase) {
            function removeRelatives(id) {
                new Firebase(fbUrl + 'questionnaires').once('value', function (snapshot) {
                    var value = snapshot.val(),
                        key,
                        i;
                    for (key in value) {
                        if (value.hasOwnProperty(key) && value[key].questions) {
                            for (i = value[key].questions.length - 1; i >= 0; i -= 1) {
                                if (value[key].questions[i] === id) {
                                    value[key].questions.splice(i, 1);
                                    new Firebase(fbUrl + 'questionnaires/' + key + '/questions')
                                        .update(value[key].questions);
                                    break;
                                }
                            }
                        }
                    }
                });
            }

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
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questions/' + id);
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
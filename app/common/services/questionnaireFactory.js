'use strict';

angular.module('ngQuestionnaires.questionnaireFactory', [])
    .factory('questionnaireFactory', [
        '$q',
        'fbUrl',
        'Firebase',
        function ($q, fbUrl, Firebase) {
            return {
                query: function (options) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questionnaires');
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
                        def.reject('Failed to query questionnaires');
                    });
                    return def.promise;
                },
                get: function (id) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questionnaires/' + id);
                    ref.once('value', function (snapshot) {
                        var value = snapshot.val(),
                            data = angular.extend(value, {id: id});
                        def.resolve(data);
                    }, function () {
                        def.reject('Failed to get questionnaire');
                    });
                    return def.promise;
                },
                add: function (data) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questionnaires'),
                        obj = ref.push(data, function (err) {
                            if (err) {
                                def.reject('Failed to add questionnaire');
                            } else {
                                def.resolve(obj.name());
                            }
                        });
                    return def.promise;
                },
                update: function (id, data) {
                    var def = $q.defer(),
                        ref = new Firebase(fbUrl + 'questionnaires/' + id);
                    delete data.id;
                    ref.update(data, function (err) {
                        if (err) {
                            def.reject('Failed to update questionnaire');
                        } else {
                            def.resolve();
                        }
                    });
                    return def.promise;
                },
                remove: function (id) {
                    var def = $q.defer();
//                    def.reject('questionnaireFactory.remove not implemented');
                    return def.promise;
                }
            };
        }]);
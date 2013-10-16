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
                        def.resolve(snapshot.val());
                    }, function () {
                        def.reject('Failed to get questionnaire');
                    });
                    return def.promise;
                },
                add: function (question) {
                    var def = $q.defer();
//                    def.reject('questionnaireFactory.add not implemented');
                    return def.promise;
                },
                update: function (id, question) {
                    var def = $q.defer();
//                    def.reject('questionnaireFactory.update not implemented');
                    return def.promise;
                },
                remove: function (id) {
                    var def = $q.defer();
//                    def.reject('questionnaireFactory.remove not implemented');
                    return def.promise;
                }
            };
        }]);
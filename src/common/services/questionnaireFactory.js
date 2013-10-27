angular.module('ngQuestionnaires.services')

  .factory('questionnaireFactory', [
    '$q',
    'underscore',
    'fbUrl',
    'Firebase',
    function ($q, underscore, fbUrl, Firebase) {
      return {
        query: function (options) {
          var def = $q.defer(),
            ref = new Firebase(fbUrl + 'questionnaires'),
            filter = function (collection, key, value) {
              return underscore.filter(collection, function (item) {
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
          var def = $q.defer(),
            ref = new Firebase(fbUrl + 'questionnaires/' + id);
          ref.remove(function (err) {
            if (err) {
              def.reject('Failed to remove questionnaire');
            } else {
              def.resolve();
            }
          });
          return def.promise;
        },

        purge: function () {
          var def = $q.defer(),
            ref = new Firebase(fbUrl + 'questionnaires');
          ref.remove(function (err) {
            if (err) {
              def.reject('Failed to purge questionnaires');
            } else {
              def.resolve();
            }
          });
          return def.promise;
        }
      };
    }]);
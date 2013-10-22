angular.module('ngQuestionnaires.services').factory('responseFactory', [
  '$q',
  'fbUrl',
  'Firebase',
  function ($q, fbUrl, Firebase) {
    return {
      query: function (options) {
        var def = $q.defer(), ref = new Firebase(fbUrl + 'responses');
        ref.once('value', function (snapshot) {
          var value = snapshot.val(), data = [], key;
          for (key in value) {
            if (value.hasOwnProperty(key)) {
              data.push(angular.extend(value[key], { id: key }));
            }
          }
          def.resolve(data);
        }, function () {
          def.reject('Failed to query responses');
        });
        return def.promise;
      },
      get: function (id) {
        var def = $q.defer(), ref = new Firebase(fbUrl + 'responses/' + id);
        ref.once('value', function (snapshot) {
          var value = snapshot.val(), data = angular.extend(value, { id: id });
          def.resolve(data);
        }, function () {
          def.reject('Failed to get response');
        });
        return def.promise;
      },
      add: function (data) {
        var def = $q.defer(), ref = new Firebase(fbUrl + 'responses'), obj = ref.push(data, function (err) {
            if (err) {
              def.reject('Failed to add response');
            } else {
              def.resolve(obj.name());
            }
          });
        return def.promise;
      },
      update: function (id, data) {
        var def = $q.defer(), ref = new Firebase(fbUrl + 'responses/' + id);
        delete data.id;
        ref.update(data, function (err) {
          if (err) {
            def.reject('Failed to update response');
          } else {
            def.resolve();
          }
        });
        return def.promise;
      },
      remove: function (id) {
        var def = $q.defer(), ref = new Firebase(fbUrl + 'responses/' + id);
        ref.remove(function (err) {
          if (err) {
            def.reject('Failed to remove response');
          } else {
            def.resolve();
          }
        });
        return def.promise;
      }
    };
  }
]);
angular.module('ngQuestionnaires.services')

  .factory('authenticationFactory', [
    '$q',
    'fbUrl',
    'Firebase',
    'FirebaseSimpleLogin',
    function ($q, fbUrl, Firebase, FirebaseSimpleLogin) {
      var ref = new Firebase(fbUrl);
      return {
        login: function (provider) {
          var def = $q.defer(),
            auth = new FirebaseSimpleLogin(ref, function (error, user) {
              if (error) {
                def.reject('Login failed');
              } else {
                def.resolve(user);
              }
            });
          auth.login(provider, {
            rememberMe: true,
            scope: 'email'
          });
          return def.promise;
        }
      };
    }]);
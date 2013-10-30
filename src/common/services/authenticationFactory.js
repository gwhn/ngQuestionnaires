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
                def.reject(error.message);
              } else if (user) {
                def.resolve(user);
              } else {
                def.reject('User is logged out');
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
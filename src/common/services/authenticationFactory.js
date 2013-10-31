angular.module('ngQuestionnaires.services')

  .factory('authenticationFactory', [
    '$rootScope',
    'fbUrl',
    'Firebase',
    'FirebaseSimpleLogin',
    function ($rootScope, fbUrl, Firebase, FirebaseSimpleLogin) {
      var ref = new Firebase(fbUrl),
        callback = function (error, user) {
          if (error) {
            $rootScope.$broadcast('loginError', error);
          } else if (user) {
            $rootScope.$broadcast('login', user);
          } else {
            $rootScope.$broadcast('logout');
          }
          $rootScope.$apply();
        },
        auth = new FirebaseSimpleLogin(ref, callback);

      return {
        login: function (provider) {
          var options = function () {
            switch (provider) {
              case 'facebook':
                return {
                  rememberMe: false,
                  scope: 'email'
                };
              case 'github':
                return {
                  rememberMe: false,
                  scope: 'user:email'
                };
              case 'twitter':
                return {
                  rememberMe: false
                };
              default:
                return {};
            }
          };
          auth.login(provider, options());
        },
        logout: function () {
          auth.logout();
        },
        clearSession: function () {
          auth.clearSession();
        }
      };
    }]);
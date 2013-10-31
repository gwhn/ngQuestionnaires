angular.module('ngQuestionnaires.services')

  .factory('authenticationFactory', [
    '$rootScope',
    'fbUrl',
    'Firebase',
    'FirebaseSimpleLogin',
    function ($rootScope, fbUrl, Firebase, FirebaseSimpleLogin) {
      return {
        login: function (provider) {
          var ref = new Firebase(fbUrl);
          new FirebaseSimpleLogin(ref, function (error, user) {
            if (error) {
              $rootScope.$broadcast('loginError', error);
            } else if (user) {
              $rootScope.$broadcast('login', user, provider);
            } else {
              $rootScope.$broadcast('logout');
            }
          }).login(provider, {scope: 'email'});
        }
      };
    }]);
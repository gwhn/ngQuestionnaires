angular.module('ngQuestionnaires.questionnaires', []);
angular.module('ngQuestionnaires.questions', []);
angular.module('ngQuestionnaires.responses', []);
angular.module('ngQuestionnaires.directives', []);
angular.module('ngQuestionnaires.filters', []);
angular.module('ngQuestionnaires.services', ['firebase']);

angular.module('ngQuestionnaires', [
    'ng',
    'ngSanitize',
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'templates-app',
    'templates-common',
    'ui.bootstrap',
    'ui.router',
    'ui.highlight',
    'ngQuestionnaires.questionnaires',
    'ngQuestionnaires.questions',
    'ngQuestionnaires.responses',
    'ngQuestionnaires.directives',
    'ngQuestionnaires.filters',
    'ngQuestionnaires.services'
  ])

  .constant('fbUrl', 'https://ngquestionnaires.firebaseio.com/')

  .constant('pagination', {itemsPerPage: 5, maxSize: 5})

  .factory('Firebase', [
    '$window',
    function ($window) {

      return $window.Firebase;

    }
  ])

  .factory('underscore', [
    '$window',
    function ($window) {

      return $window._;

    }
  ])

  .factory('d3', [
    '$window',
    function ($window) {

      return $window.d3;

    }
  ])

  .config(function ($urlRouterProvider) {

    $urlRouterProvider.otherwise('/questionnaires/list');

  })

  .run([
    '$rootScope',
    '$cacheFactory',
    '$timeout',
    'fbUrl',
    'Firebase',
    'angularFireAuth',
    'questionnaires',
    'questions',
    'responses',
    function ($rootScope, $cacheFactory, $timeout, fbUrl, Firebase, angularFireAuth, questionnaires, questions, responses) {

      var data = {};
      data.questionnaires = questionnaires;
      data.questions = questions;
      data.responses = responses;

      angularFireAuth.initialize(
        new Firebase(fbUrl), {
          scope: $rootScope,
          name: 'user'
        }
      );

      $cacheFactory('data');

    }
  ])

  .controller('appCtrl', [
    '$scope',
    '$modal',
    '$q',
    '$state',
    '$cookieStore',
    '$location',
    'angularFireAuth',
    function ($scope, $modal, $q, $state, $cookieStore, $location, angularFireAuth) {

      $scope.$on('$stateChangeStart', function (event, toState) {
        if (!$scope.user && (
          toState.name === 'questionnaireNew' ||
            toState.name === 'questionnaireEdit' ||
            toState.name === 'questionNew' ||
            toState.name === 'questionEdit' ||
            toState.name === 'responseNew'
          )) {
          $scope.addErrorAlert('Permission denied');
          event.preventDefault();
        }
      });

      $scope.$on('$stateChangeSuccess', function (event, toState) {
        if (angular.isDefined(toState.data.pageTitle)) {
          $scope.pageTitle = toState.data.pageTitle;
        }
      });

      $scope.isLoading = false;
      $scope.loading = function (show) {
        $scope.isLoading = show;
      };

      $scope.$on('angularFireAuth:login', function (event, user) {
        $scope.addSuccessAlert('Logged in to ' + user.provider + ' as ' + user.displayName + ' successfully');
      });

      $scope.$on('angularFireAuth:logout', function (event) {
        $scope.addWarningAlert('Logged out');
      });

      $scope.$on('angularFireAuth:error', function (event, error) {
        $scope.addWarningAlert(error.message);
      });

      $scope.login = function (provider) {
        angularFireAuth.login(provider);
      };

      $scope.logout = function () {
        angularFireAuth.logout();
      };

      $scope.alerts = [];

      $scope.addAlert = function (type, msg) {
        $scope.alerts.unshift({
          type: type,
          msg: msg
        });
      };

      $scope.addSuccessAlert = function (msg) {
        $scope.addAlert('success', msg);
      };

      $scope.addInfoAlert = function (msg) {
        $scope.addAlert('info', msg);
      };

      $scope.addErrorAlert = function (msg) {
        $scope.addAlert('danger', msg);
      };

      $scope.addWarningAlert = function (msg) {
        $scope.addAlert('warning', msg);
      };

      $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
      };

      if (!$cookieStore.get('acceptedTerms')) {
        $modal.open({
          controller: 'termsCtrl',
          templateUrl: 'terms.tpl.html'
        }).result.then(function () {
          $cookieStore.put('acceptedTerms', true);
        });
      }

    }
  ])

  .controller('termsCtrl', [
    '$scope',
    '$modalInstance',
    function ($scope, $modalInstance) {

      $scope.ok = function () {
        $modalInstance.close();
      };

    }
  ]);

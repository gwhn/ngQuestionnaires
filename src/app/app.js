angular.module('ngQuestionnaires.questionnaires', []);
angular.module('ngQuestionnaires.questions', []);
angular.module('ngQuestionnaires.responses', []);
angular.module('ngQuestionnaires.directives', []);
angular.module('ngQuestionnaires.filters', []);
angular.module('ngQuestionnaires.services', []);

angular.module('ngQuestionnaires', [
    'ng',
    'ngAnimate',
    'templates-app',
    'templates-common',
    'ui.bootstrap',
    'ui.router',
    'ngQuestionnaires.questionnaires',
    'ngQuestionnaires.questions',
    'ngQuestionnaires.responses',
    'ngQuestionnaires.directives',
    'ngQuestionnaires.filters',
    'ngQuestionnaires.services'
  ])

  .constant('fbUrl', 'https://ngquestionnaires.firebaseio.com/')

  .constant('pagination', {
    itemsPerPage: 5,
    maxSize: 10
  })

  .value('Firebase', window.Firebase)

  .value('underscore', window._)

  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/questionnaires/list');
  })

  .run(['$cacheFactory', function ($cacheFactory) {
    var data = $cacheFactory('data');
  }])

  .controller('appCtrl', ['$scope', function ($scope) {

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle;
      }
    });

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
      $scope.addAlert('error', msg);
    };

    $scope.addWarningAlert = function (msg) {
      $scope.addAlert('warning', msg);
    };

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

  }]);

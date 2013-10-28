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

  .constant('fbCdn', 'https://cdn.firebase.com/v0/firebase.js')

  .constant('fbUrl', 'https://ngquestionnaires.firebaseio.com/')

  .constant('pagination', {
    itemsPerPage: 5,
    maxSize: 10
  })

  .factory('Firebase', ['$window', function ($window) {
    return $window.Firebase;
  }])

  .factory('underscore', ['$window', function ($window) {
    return $window._;
  }])

  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/questionnaires/list');
  })

  .run(['$cacheFactory', function ($cacheFactory) {
    var data = $cacheFactory('data');
  }])

  .controller('appCtrl',
    ['$scope', '$modal', '$q', 'questionnaireFactory', 'questionFactory', 'responseFactory', 'underscore',
      function ($scope, $modal, $q, questionnaireFactory, questionFactory, responseFactory, underscore) {

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
          if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle;
          }
        });

        $scope.isLoading = false;
        $scope.loading = function (show) {
          $scope.isLoading = show;
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
          $scope.addAlert('error', msg);
        };

        $scope.addWarningAlert = function (msg) {
          $scope.addAlert('warning', msg);
        };

        $scope.closeAlert = function (index) {
          $scope.alerts.splice(index, 1);
        };

        $scope.confirm = function () {
          $modal.open({
            controller: 'seedCtrl',
            templateUrl: 'seed.tpl.html'
          }).result
            .then(function () {
              var questions,
                question,
                questionnaires,
                questionnaire,
                i, j,
                x = 10, y = 1000, z = 100,
                promises,
                found = function (values, match) {
                  return underscore.find(values, function (value) {
                    return value === match;
                  });
                },
                makeResponse = function (questionnaireId, key) {
                  var deferred = $q.defer();
                  questionnaireFactory.get(questionnaireId)
                    .then(function (questionnaire) {
                      var response = {
                        respondent: 'Respondent ' + (key + 1),
                        questionnaire: questionnaire.title,
                        answers: []
                      };
                      promises = [];
                      angular.forEach(questionnaire.questions, function (questionId) {
                        promises.push(makeAnswer(questionId));
                      });
                      return $q.all(promises)
                        .then(function (answers) {
                          response.answers = answers;
                          return responseFactory.add(response);
                        })
                        .then(deferred.resolve);
                    });
                  return deferred.promise;
                },
                makeAnswer = function (questionId) {
                  var deferred = $q.defer();
                  questionFactory.get(questionId)
                    .then(function (question) {
                      deferred.resolve({
                        question: question.text,
                        choice: question.choices[Math.floor(Math.random() * question.choices.length)].text
                      });
                    });
                  return deferred.promise;
                };

              $q.all([
                  questionnaireFactory.purge(),
                  questionFactory.purge(),
                  responseFactory.purge()
                ])

                .then(function () {
                  $scope.addWarningAlert('All questionnaires, questions and responses were purged');
                })

                .then(function () {
                  promises = [];
                  for (i = 0; i < y; i += 1) {
                    question = {
                      text: 'Question ' + (i + 1),
                      choices: []
                    };
                    for (j = 0; j < x; j += 1) {
                      question.choices.push({text: 'Choice ' + (j + 1) + ' of question ' + (i + 1)});
                    }
                    promises.push(questionFactory.add(question));
                  }
                  return $q.all(promises)
                    .then(function (values) {
                      questions = values;
                    });
                })

                .then(function () {
                  $scope.addInfoAlert('Created ' + y + ' questions');
                })

                .then(function () {
                  promises = [];
                  for (i = 0; i < y; i += 1) {
                    questionnaire = {
                      title: 'Questionnaire ' + (i + 1),
                      description: 'Description for questionnaire ' + (i + 1),
                      published: true,
                      questions: []
                    };
                    for (j = 0; j < z; j += 1) {
                      question = questions[Math.floor(Math.random() * y)];
                      if (!found(questionnaire.questions, question)) {
                        questionnaire.questions.push(question);
                      }
                    }
                    promises.push(questionnaireFactory.add(questionnaire));
                  }
                  return $q.all(promises)
                    .then(function (values) {
                      questionnaires = values;
                    });
                })

                .then(function () {
                  $scope.addInfoAlert('Created ' + y + ' questionnaires');
                })

                .then(function () {
                  promises = [];

                  for (i = 0; i < questionnaires.length; i += 1) {
                    promises.push(makeResponse(questionnaires[i], i));
                  }

                  return $q.all(promises);
                })

                .then(function () {
                  $scope.addInfoAlert('Created ' + y + ' responses');
                });
            });
        };

      }])

  .controller('seedCtrl',
    ['$scope', '$modalInstance',
      function ($scope, $modalInstance) {
        $scope.ok = function () {
          $modalInstance.close();
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    ]);

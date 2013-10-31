angular.module('ngQuestionnaires.filters')

  .filter('take', function () {
    return function (value, start) {
      return value ? value.slice(0, parseInt(start, 10)) : value;
    };
  });
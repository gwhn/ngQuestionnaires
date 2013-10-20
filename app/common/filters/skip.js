'use strict';

angular.module('ngQuestionnaires.skip', [])
    .filter('skip', function () {
        return function (value, start) {
            return value ? value.slice(parseInt(start, 10)) : value;
        };
    });
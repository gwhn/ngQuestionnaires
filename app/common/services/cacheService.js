'use strict';

angular.module('ngQuestionnaires.cacheService', ['ng'])
    .factory('cacheService', function ($cacheFactory) {
        return $cacheFactory('cacheService');
    });
'use strict';

angular.module('meanshopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('cook', {
        url: '/cook',
        templateUrl: 'app/cook/cook.html',
        controller: 'CookCtrl',
        authenticate: 'cook'
      })

      .state('onlyCook', {
        url: '/cook-access',
        templateUrl: 'app/cook/only-cook.html'
      });
  });

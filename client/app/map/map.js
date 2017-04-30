'use strict';

angular.module('meanshopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/map',
        templateUrl: 'app/map/map.html',
        controller: 'queryCtrl'
      });
  });

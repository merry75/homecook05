'use strict';

angular.module('meanshopApp')
  .controller('CookCtrl', function($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

  });
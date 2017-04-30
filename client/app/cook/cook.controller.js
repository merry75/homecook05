'use strict';

angular.module('meanshopApp')
  .controller('CookCtrl', function($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      $scope.users.splice(this.$index, 1);
    };
  });
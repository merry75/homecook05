'use strict';

angular.module('meanshopApp')
  .controller('SignupCtrl', function($scope, Auth, $state, $window, geo, $q) {

    // $scope.$on('$viewContentLoaded', function() {
    //     //call it here
    //     window.onload = getLocation;
    //     var geo = navigator.geolocation;

    //     function getLocation() {
    //         if (geo) {
    //             geo.getCurrentPosition(displayLocation);
    //         } else {
    //             alert("Oops, Geolocation API is not supported");
    //         }
    //     }

    //     function displayLocation(position) {

    //         var lang = position.coords.longitude;
    //         var lat = position.coords.latitude;
    //         console.log(lat);

    //         $scope.$apply(function() {
    //             document.getElementById('txtlat').value = lat;
    //             document.getElementById('txtlang').value = lang;
    //         });

    //         // document.getElementById('txtlat').value = lat;
    //         // document.getElementById('txtlang').value = lang;
    //     }

    // });

      geo.getLocation().then(
    function( pos ) {
      $scope.user = pos.coords;
      console.log($scope.user);
    },
    function(error) {
      console.log(error);
    }
  );



    $scope.user = {};
    $scope.errors = {};
    $scope.register = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          location: [$scope.user.longitude,$scope.user.latitude],
          role: $scope.user.role
        })
        .then(function() {
          // Account created, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          err = err.data;
          console.log(err);
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      } else {
        console.log("form not work")
      }
      console.log($scope.user);
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });

'use strict';

angular.module('meanshopApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ngFileUpload',
  'ngCart',
  'braintree-angular',
  'geolocation',
  'gservice'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function($rootScope, $q, $cookies, $injector) {
    var state;
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in
    // also if the user role doesn't match with the one in `next.authenticate`
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate) {
        var loggedIn = Auth.isLoggedIn(function(role) {
          if (role && next.authenticate.indexOf(role[0]) !== -1) {
            console.log('works')
            return; // logged in and roles matches
          }

          event.preventDefault();
          if(role) {
            // logged in but not have the privileges (roles mismatch)
            console.log(next.authenticate.indexOf(role[0]));
            $state.go('onlyAdmin');
          } else {
            // not logged in
            $state.go('login');
          }
        });
      }
    });
  });


// .run(function($rootScope, $state, Auth) {
//   // Redirect to login if route requires auth and the user is not logged in
//   $rootScope.$on('$stateChangeStart', function(event, next) {
//     if (next.authenticate) {
//       Auth.isLoggedIn(function(loggedIn) {
//         if (!loggedIn) {
//           event.preventDefault();
//           $state.go('login');
//         }
//       });
//     }
//   });
// });
// Creates the gservice factory.
// This will be the primary means of interaction with Google Maps

angular.module('gservice', [])
    .factory('gservice', function ($rootScope, $http) {


        // Initialize Variables
        // ---------------------------------------------------
        // Service our factory will return
        var googleMapService = {};




      // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      googleMapService.initAutocomplete = function () {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 8,
          mapTypeId: 'roadmap'
        });
    }

   
        return googleMapService;

    }); // end .factory('gservice'...)
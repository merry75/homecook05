angular.module('meanshopApp')
  .factory( 'geo', function($q) {
  return {
    getLocation: function() {
      var deferred = $q.defer();
      if( !navigator.geolocation ) {
        // geolocation is not available, 
        // better just reject the promise and return it :(

        deferred.reject( "Oops, Geolocation API is not supported" );
        return deferred.promise;
      }
      
      navigator.geolocation.getCurrentPosition(
        function (pos) {
           // We have your position!
           // console.log(pos.coords.longitude)
           //var location = [pos.coords.longitude,pos.coords.latitude]
           deferred.resolve(pos);
           // deferred.resolve(latitude);
        }, 
        function (error) {
           // Oh no! We can't get your position
          deferred.reject(error);
        }, {
          // Some setings 
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }
      );

      return deferred.promise
    }
  };
})




// $(function() {
//   window.onload = getLocation;
//   var geo = navigator.geolocation;

//   function getLocation() {
//     if (geo) {
//       geo.getCurrentPosition(displayLocation);
//     } else {
//       alert("Oops, Geolocation API is not supported");
//     }
//   }

//   function displayLocation(position) {


//         var lang = position.coords.longitude;
//     var lat = position.coords.latitude;
//     console.log(lat);
//     document.getElementById('txtlat').value = lat;
//     document.getElementById('txtlang').value = lang;
//   }


// });
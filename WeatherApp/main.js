// $.ajax({});
      // initMap function called on loading map onto browser
      function initMap() {
        var loc = "http://ip-api.com/json/?callback=";
        var open = "http://api.openweathermap.org/data/2.5/weather?q=";
        loc.crossOrigin="Anonymous";
        open.crossOrigin="Anonymous";
          // using ip-api.com api to get current location and using the response to pass
          //  to openweathermap api to get all weather conditions
       $.getJSON(loc, function(locationIp) {
        $.getJSON(open+locationIp.city+'',
          +locationIp.region+'&appid=a35e9a8b8962b6bf0bdf1eff2802403c', function(weatherDisplay){
          $(".address").append(locationIp.city + ','+locationIp.region);
          $(".weather").append(weatherDisplay.weather[0].main);
           $(".description").append(weatherDisplay.weather[0].description);
            $(".plLat").append(weatherDisplay.coord.lat);
             $(".plLon").append(weatherDisplay.coord.lon);
              $(".temp").append((weatherDisplay.main.temp-273.15).toFixed(2)).append(" Celsius");
               $(".pressure").append(weatherDisplay.main.pressure).append(" hPa");
                $(".humidity").append(weatherDisplay.main.humidity).append(" %");
                $(".speed").append(weatherDisplay.wind.speed).append(" meter/sec");
                $(".deg").append(weatherDisplay.wind.deg).append(" degrees");
                $(".sunrise").append(new Date(weatherDisplay.sys.sunrise*1000).toString());
                $(".sunset").append(new Date(weatherDisplay.sys.sunset*1000).toString());

                // Displaying map and marker on the map to current location
        var yash = {lat: weatherDisplay.coord.lat, lng: weatherDisplay.coord.lon};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: yash
        });
        var marker = new google.maps.Marker({
          position: yash,
          map: map,
          animation: google.maps.Animation.DROP,
          draggable:true
        });
        // Listener to marker on drag to display Temp stats to draged location
        //Add listener        
        google.maps.event.addListener(marker, "dragend", function (event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        console.log( latitude + ', ' + longitude );
        //setting new latitude and longitudes
        yash.lat=latitude;yash.lon=longitude;
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
        });
        //moving map to dragged location using marker
        map.panTo({lat:yash.lat, lng:yash.lon}, 6);
        marker.setMap(map);
        //getting new locations coordinates and passing values to appweather api
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+
          '&key=AIzaSyDvo6upDpIoOeiCOqZ3tmOiX2PSSRV_lc0',
          function(response){
            console.log(response.status);
            if(response.status == "OK"){
              // display only when marker is dragged to valid location but not to places like
              // ocean,himalayan ranges
              $(".displayNone").css("display","")  ; 
              $.getJSON('http://api.openweathermap.org/data/2.5/weather?q='+response.
                results[2].formatted_address+'&appid=a35e9a8b8962b6bf0bdf1eff2802403c',
                 function(weatherDisplay){
            console.log(response.results[1].formatted_address);
            $(".address").text("Address : "+response.results[1].formatted_address+ ',');
            $(".weather").text("Weather : "+weatherDisplay.weather[0].main);
           $(".description").text("Description : "+weatherDisplay.weather[0].description);
            $(".plLat").text("Latitude : "+weatherDisplay.coord.lat);
             $(".plLon").text("Longitude : "+weatherDisplay.coord.lon);
              $(".temp").text("Temperature : "+(weatherDisplay.main.temp-273.15).toFixed(2))
                 .append(" Celsius");
               $(".pressure").text("Pressure : "+weatherDisplay.main.pressure)
                 .append(" hPa");
                $(".humidity").text("Humidity : "+weatherDisplay.main.humidity)
                .append(" %");
                $(".speed").text("Speed : "+weatherDisplay.wind.speed)
                .append(" meter/sec");
                $(".deg").text("Direction : "+weatherDisplay.wind.deg).append(" degrees");
                $(".sunrise").text("SunRise : "+new Date(weatherDisplay.sys.
                  sunrise*1000).toString());
                $(".sunset").text("SunSet : "+new Date(weatherDisplay.sys.
                  sunset*1000).toString());
          }); }else { //else displaying error message
                $(".address").text("Cannot get the statistcs of the required location.Try another Place");
                $(".displayNone").css("display","none")  ;  
                map;         
                 }
        }); //end addListener 
        });//this listener is called every time marker is dragged to new location
        });
      });
    }
    

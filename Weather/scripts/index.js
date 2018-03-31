 /**
  * Created by Amol!
  */
var init =function (){
  /**
   * Global Object to store Latitude and Longitude values.
   */
  coordinateObject = {
    lat:null,
    long:null,
  }

  /**
   * Global variable to store Json object from API response.
   */
  responseData=null;

  /**
   * Hard-coded variable to convert integer to corresponding 
   * Day and Month.
   */
  weekdays=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
  months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];


  /**
   *  onLoad
   */
  function onLoad(){
    var list = document.getElementById("heading1");
    console.log(navigator.geolocation);
    $( "#headin" ).click(function() {
      alert( "Handler for .click() called." );
    });
        var cordinates;
            console.log("in");
      getPreciseLocation()
      .then(storeLocation)
      .then(getWeatherInfo)
      .then(renderData);
    
  }
  /**
  * Get geoLocation
  */
  function getPreciseLocation() {
    return new Promise(function (resolve, reject) {
    
      /**
       * Object options containing properties to pass as a parameter 
       * of Geolocation.getCurrencPosition()
       */
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 6000000
      };

      /**
       * Get current position
       */
      navigator.geolocation.getCurrentPosition(function (position) {
          return resolve([position.coords.latitude, position.coords.longitude]);
        },function(err){
            console.log(err);
          },
      options);
    });
  }

  /**
   * Stores Cordinates in CordinateObject.
   * @param {Array} cordinates  
   */
  function storeLocation(cordinates){
    
    coordinateObject['lat']=cordinates[0];
    coordinateObject['long']=cordinates[1];
    console.log("latitude"+coordinateObject['lat']+" Longitude"+coordinateObject['long']);
  }

  /**
   * Gets Weather Information based on Cordinates
   */
  function getWeatherInfo(){
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat="+coordinateObject['lat'].toFixed(2)+"&lon="+coordinateObject['long'].toFixed(2)+"", false);
    xhr.onload = function () {
    // Begin accessing JSON responseData here
      responseData = JSON.parse(this.response);
      if (xhr.status >= 200 && xhr.status < 400 && responseData['coord']['lat']==coordinateObject['lat'].toFixed(2) && responseData['coord']['lon']==coordinateObject['long'].toFixed(2)) {
        coordinateObject['temp']=responseData['main']['temp'];
        coordinateObject['icon']=responseData['weather'][0]['icon'];
        console.log("icon:"+coordinateObject['icon']);
      } else {
        getWeatherInfo();
        console.log('resent= '+responseData['coord']['lat']+" "+responseData['coord']['lon']);
      } 
    }
    xhr.send();
    
  }

  /**
   * True: Show temperature in celsius
   * False: Show temperature in farheneit
   */
  degreeCelsius=true;

  
  /**
   * Changes boolean value of degreeCelsius, 
   * if user clicks on temperature HTML element.
   */
  function changeTemperature(){
    var displayTemp = document.getElementById("displayTemperature");
    console.log("inside")
    if(degreeCelsius){
      var degreeFarheniet=(responseData['main']['temp']*1.8)+32;
        console.log("far"+degreeFarheniet);
        displayTemp.innerHTML=Math.round(degreeFarheniet);
        degree.innerHTML = "&#176; F";
      degreeCelsius=false;
    }
    else if(!degreeCelsius){
      degreeCelsius=true;
    }
    
  }

  /**
   * Renders Weather data
   */
  function renderData(){
    if(responseData['main']['temp']!=null){
      var displayTemp = document.getElementById("displayTemperature");
      var degree = document.getElementById("degree");
      // console.log("temp"+coordinateObject['temp']);
      if(degreeCelsius){
        displayTemp.innerHTML = Math.round(responseData['main']['temp']);
        degree.innerHTML = "&#176; C";
      }
      else{
        var degreeFarheniet=(responseData['main']['temp']*1.8)+32;
        console.log("far"+degreeFarheniet);
        displayTemp.innerHTML=Math.round(degreeFarheniet);
        degree.innerHTML = "&#176; F";
      }
    if(responseData['weather'][0]['icon']!=undefined && responseData['weather'][0]['icon']!=null){
      var date = new Date();
      var modulus;
      var hours=0;
      if(date.getHours()<=12){
        modulus="AM";
        hours=date.getHours();
      }
      else{
        modulus="PM";
        hours=date.getHours()%12;
      }
      document.getElementById("time").innerHTML = hours+":"+date.getMinutes()+" "+modulus;
      document.getElementById("date").innerHTML = weekdays[date.getDay()]+", "+date.getDate()+" "+months[date.getMonth()];
      document.getElementById("description").innerHTML = responseData['weather'][0]['description'];
      document.getElementById("icon-image").src = coordinateObject['icon']; 
      document.getElementById("heading2").innerHTML = responseData['name']+" , "+responseData['sys']['country'];
    }
    }
  }
  
  onLoad();
 
}
//init.changeTemperature();
function change(){
  console.log("lol");
 console.log(init.degreeCelsius);
}
init();

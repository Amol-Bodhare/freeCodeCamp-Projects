/**
 * Created by Amol!
 */

/**
 * Object to store location coordinates 
 */
coordinatesObject = {
  lat:null,
  long:null,
}

/**
 * Object variable to store API Response.
 */
data=null;

/**
 * Hard-coded Arrays, to convert integer value to corresponding day and month
 */
weekdays=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

/**
 * Initialization function
 */
function onLoad(){
    
    getPreciseLocation()
   .then(storeLocation)
   .then(getWeatherInfo)
   .then(renderData);
  
}
/**
 * Get Location
 */
function getPreciseLocation() {
 return new Promise(function (resolve, reject) {
   console.log("er");
   var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 6000000
   };
   navigator.geolocation.getCurrentPosition(function (position) {
     console.log("position: "+position.coords.latitude);
     resolve([position.coords.latitude, position.coords.longitude]);
     
   },function(err){
     console.log("errrrr");
     console.log(err);
   },options);
 });
}

/**
 * Stores Coordinates from getCurrentPosition to coordinatesObject.
 * @param {Array} coordinates 
 */
function storeLocation(coordinates){
 
 coordinatesObject['lat']=coordinates[0];
 coordinatesObject['long']=coordinates[1];
 
}
/**
 * Get Weather information using current coordinates.
 */
function getWeatherInfo(){
 
 var xhr = new XMLHttpRequest();
 xhr.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat="+coordinatesObject['lat'].toFixed(2)+"&lon="+coordinatesObject['long'].toFixed(2)+"", false);
 xhr.onload = function () {
  // Begin accessing JSON data here
  data = JSON.parse(this.response);
  if (xhr.status >= 200 && xhr.status < 400 && data['coord']['lat']==coordinatesObject['lat'].toFixed(2) && data['coord']['lon']==coordinatesObject['long'].toFixed(2)) {
   
  } else {
   getWeatherInfo();
   console.log('resent= '+data['coord']['lat']+" "+data['coord']['lon']);
  }
 }
 xhr.send();
}
/**
 * Show temp in Celsius: true
 * Show temp in Farheneit: false
 */
degreeCelsius=true;
/**
 * Triggers if Clicked on Temperature.
 */
function changeTemperature(){
 if(degreeCelsius){
   degreeCelsius=false;
 }
 else if(!degreeCelsius){
   degreeCelsius=true;
 }
 
 renderData();
}

/**
 * Renders data on HTML
 */
function renderData(){
 if(data['main']['temp']!=null){
   var displayTemp = document.getElementById("displayTemperature");
   var degree = document.getElementById("degree");
  
   if(degreeCelsius){
     displayTemp.innerHTML = Math.round(data['main']['temp']);
     degree.innerHTML = "C";
   }
   else{
     var degreeFarheniet=(data['main']['temp']*1.8)+32;
     console.log("far"+degreeFarheniet);
     displayTemp.innerHTML=Math.round(degreeFarheniet);
     degree.innerHTML = "F";
   }
 if(data['weather'][0]['icon']!=undefined && data['weather'][0]['icon']!=null){
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
   document.getElementById("description").innerHTML = data['weather'][0]['description'];
   document.getElementById("icon-image").src = data['weather'][0]['icon']; 
   document.getElementById("heading2").innerHTML = data['name']+" , "+data['sys']['country'];
 }
 }
}
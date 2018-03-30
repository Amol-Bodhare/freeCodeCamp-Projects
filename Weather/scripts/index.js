 obj = {
   lat:null,
   long:null,
 }
data=null;
weekdays=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
function getLocation(){
  var list = document.getElementById("heading1");
  if (navigator.geolocation) {
       var lat;
          console.log("in");
     getPreciseLocation()
    .then(displayData)
    .then(getWeatherInfo)
    .then(renderData);
    } else {
        console.log("Error");
        list.innerHTML = "Geolocation is not supported by this browser.";
    }
}
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

function displayData(lat){
  console.log("longitude is:"+lat);
  obj['lat']=lat[0];
  obj['long']=lat[1];
  console.log("longggg"+obj['lat']+" "+obj['long']);
}
function getWeatherInfo(){
  console.log("getWeather"+obj['lat']+" "+obj['long']);
  var xhr = new XMLHttpRequest();
xhr.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat="+obj['lat'].toFixed(2)+"&lon="+obj['long'].toFixed(2)+"", false);
xhr.onload = function () {
  // Begin accessing JSON data here
  data = JSON.parse(this.response);
 if (xhr.status >= 200 && xhr.status < 400 && data['coord']['lat']==obj['lat'].toFixed(2) && data['coord']['lon']==obj['long'].toFixed(2)) {
    obj['temp']=data['main']['temp'];
    obj['icon']=data['weather'][0]['icon'];
   console.log("icon:"+obj['icon']);
  } else {
    getWeatherInfo();
    console.log('resent= '+data['coord']['lat']+" "+data['coord']['lon']);
  }
  
}
  xhr.send();
  console.log(xhr.status);
  console.log("temp"+obj['temp']);
console.log(xhr.statusText);
}
degreeCelsius=true;
function changeTemperature(){
  if(degreeCelsius){
    degreeCelsius=false;
  }
  else if(!degreeCelsius){
    degreeCelsius=true;
  }
  
  renderData();
}
function renderData(){
  if(data['main']['temp']!=null){
    var displayTemp = document.getElementById("displayTemperature");
    var degree = document.getElementById("degree");
    console.log("temp"+obj['temp']);
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
    document.getElementById("icon-image").src = obj['icon']; 
    document.getElementById("heading2").innerHTML = data['name']+" , "+data['sys']['country'];
  }
  }
}

/**
 * Created by Amol!
 */
index=0;
var streamsObject ={
    0:"ESL_SC2",
    1:"OgamingSC2",
    2:"cretetion", 
    3:"freecodecamp",
    4:"storbeck",
    5:"habathcx",
    6:"RobotCaleb",
    7:"noobs2ninjas",
    8:"capcomfighters"
}
function onLoad(){
    document.getElementById("head").innerHTML="heading";
    var size = Object.keys(streamsObject).length;
    for(var i=0;i<size;i++){
        index=i;
        console.log("index"+index);
        var script = document.createElement("script");
        script.src="https://wind-bow.glitch.me/twitch-api/streams/"+streamsObject[i]+"?&callback=foo";
        document.body.appendChild(script);
        document.body.removeChild(script);
    }
}
    


function foo(obj){
    console.log(index);
    console.log(obj['_links']['self']);
    var url = "https://api.twitch.tv/kraken/streams/";
        var streamName = obj['_links']['self'].split(url);
        //id("head").innerHTML=streamName[1]+" is Offline";
        var head = document.createElement("h1");
    if(obj['stream']===null){
        
        head.innerHTML = streamName[1]+" is Offline";
        document.body.appendChild(head);
        
    }else{
        head.innerHTML = streamName[1]+" is Online";
        var para = document.createElement("p");
        para.innerHTML = (obj['stream']['channel']['status']);
        document.body.appendChild(head);
        document.body.appendChild(para);
    }
    

}
function id(id){
    return document.getElementById(id);
}
setInterval(function() {
    // method to be executed;
    console.log("setInterval");
  }, 5000);
onLoad();
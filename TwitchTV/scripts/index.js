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
    7:"noobs2ninjas"
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
    if(obj['stream']===null){
        var url = "https://api.twitch.tv/kraken/streams/";
        var streamName = obj['_links']['self'].split(url);
        //id("head").innerHTML=streamName[1]+" is Offline";
        var head = document.createElement("h1");
        head.innerHTML = streamName[1]+" is Offline";
        document.body.appendChild(head);
    }

}
function id(id){
    return document.getElementById(id);
}
onLoad();
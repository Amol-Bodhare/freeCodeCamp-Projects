/**
 * Created by Amol!
 */
index=0;
 streamsObject ={
    "ESL_SC2":{status:""},
    "OgamingSC2":{status:""},
    "cretetion":{status:""}, 
    "freecodecamp":{status:""},
    "habathcx":{status:""},
    "RobotCaleb":{status:""},
    "noobs2ninjas":{status:""},
    "capcomfighters":{status:""}
}

function onLoad(){
    document.getElementById("head").innerHTML="heading";
    
    apiCall().then(display);

}
function apiCall(){
    return new Promise((resolve, reject) => {
        var keys = Object.keys(streamsObject);
        for(var i=0;i<keys.length;i++){
            console.log("before")
            var script = document.createElement("script");
            script.src="https://wind-bow.glitch.me/twitch-api/streams/"+keys[i]+"?&callback=foo";
            document.body.appendChild(script);
            //document.body.removeChild(script);
            console.log("after");
        }
        //console.log(JSON.stringify(streamsObject));
        resolve();
        //reject(console.log("err"));
    });
}

function display(data){
    console.log(data);
    // var keys = Object.keys(data);
    // for(var i=0;i<keys.length;i++){
    //     var listItem = document.createElement("li");

    //     listItem.innerHTML = keys[i] + " is " + data[keys[i]]['status'];
    //     id("list").appendChild(listItem);
    // }
}
function foo(obj){
   console.log("foo");
    var url = "https://api.twitch.tv/kraken/streams/";
    var streamName = obj['_links']['self'].split(url);
       
        //var listItem = document.createElement("li");
    if(obj['stream']===null){
       
        streamsObject[streamName[1]]['status'] = "Offline";
        id(streamName[1]).setAttribute("style","color:yellow");
       // id("list").appendChild(listItem);
        
    }else{
        streamsObject[streamName[1]]['status'] = "Online";
        id(streamName[1]).setAttribute("style","color:#004d00");
        console.log(obj);
        id(streamName[1]+"-span").innerHTML = obj['stream']['channel']['status'];
        // listItem.innerHTML = streamName[1]+" is Online";
        // var para = document.createElement("p");
        // para.innerHTML = (obj['stream']['channel']['status']);
        // id("list").appendChild(listItem);
        // //listItem.setAttribute("id","l1");
        // listItem.appendChild(para);
    }
    var listItem = document.getElementById(streamName[1]);
   // var icon = document.getElementById(streamName[1]+"icon");
   // icon =
    listItem.innerHTML = streamsObject[streamName[1]]['status'];
        //id("list").appendChild(listItem);
   // resolve(streamsObject);
    //console.log(JSON.stringify(streamsObject));

}
function id(id){
    return document.getElementById(id);
}
setInterval(function() {
    // method to be executed;
    
    
  }, 5000);
onLoad();
console.log("end");

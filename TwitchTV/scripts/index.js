/**
 * Created by Amol!
 */
/**
 * streamsObject: Object variable to store status of streams
 * Status initialized as empty string.
 */
streamsObject = {
    "ESL_SC2": { status: "" },
    "OgamingSC2": { status: "" },
    "cretetion": { status: "" },
    "freecodecamp": { status: "" },
    "habathcx": { status: "" },
    "RobotCaleb": { status: "" },
    "noobs2ninjas": { status: "" },
    "capcomfighters": { status: "" }
}

/**
 * OnLoad initializes the execution of JavaScript
 */
function onLoad() {

    apiCall();

}
/**
 * function responsible for requesting data from Twicth API 
 */
function apiCall() {
    return new Promise((resolve, reject) => {
        var keys = Object.keys(streamsObject);
        for (var i = 0; i < keys.length; i++) {

            var script = document.createElement("script");
            script.src = "https://wind-bow.glitch.me/twitch-api/streams/" + keys[i] + "?&callback=foo";
            document.body.appendChild(script);


        }


    });
}

/**
 * Callback function  
 * 
 * @param {JSON Object} obj : contains API response.
 */
function foo(obj) {
    console.log("foo");
    var url = "https://api.twitch.tv/kraken/streams/";
    var streamName = obj['_links']['self'].split(url);


    if (obj['stream'] === null) {

        streamsObject[streamName[1]]['status'] = "Offline";
        id(streamName[1]).setAttribute("style", "color:yellow");


    } else {
        streamsObject[streamName[1]]['status'] = "Online";
        id(streamName[1]).setAttribute("style", "color:#004d00");
        console.log(obj);
        id(streamName[1] + "-span").innerHTML = obj['stream']['channel']['status'];

    }
    var listItem = document.getElementById(streamName[1]);

    listItem.innerHTML = streamsObject[streamName[1]]['status'];

}

/**
 * returns document.getElementByID();
 * @param {var} id : contains ID of HTML element 
 */
function id(id) {
    return document.getElementById(id);
}

/**
 * Timeout function to refresh page
 * Time interval: 5 sec.
 */
setInterval(function () {
    // method to be executed;


}, 5000);

/**
 * Executing onLoad().
 */
onLoad();


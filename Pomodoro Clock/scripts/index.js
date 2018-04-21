

function init() {
    time1 = 5;
    sec = 59;
    var timeRunning=false;
    var runTime=null;
    document.getElementById("reset").addEventListener("click",reset);
    document.getElementById("start").addEventListener("click",startTime, {once: true});
    document.getElementById("stop").addEventListener("click",stopTime,false);
    function startTime() {
        timeRunning=true;
        runTime = setInterval(function(){iterate()},1000);
    }
    function stopTime() {
        timeRunning=false;
        clearInterval(runTime);
        document.getElementById("start").addEventListener("click",startTime, {once: true});
    }
    function iterate() {
        if(sec<0){
            time1--;
            sec=59;
        }
        if(sec<10){
            console.log(time1+":"+sec.toString().padStart(2,"0"));
        }
        else {
            console.log(time1+":"+sec);
        }
        
        sec--;
    }
    function reset() {
        if(!timeRunning) {
            time1 = 5;
            sec = 59;
            var runTime=null;
        }
    }
    
}
init();
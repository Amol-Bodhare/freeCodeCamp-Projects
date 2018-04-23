

function init() {
    //time1 = 5;
    sec = 59;
    var timeRunning=false;
    var runTime=null;
    //document.getElementById("top").className="top1";
    
    document.getElementById("start").addEventListener("click",startTime, {once: true});
    document.getElementById("stop").addEventListener("click",stopTime,false);
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;
    time1=slider.value-1;
    slider.oninput = function() {
     output.innerHTML = this.value;
    // time1=this.value;
    document.getElementById("top").style.animation= `none`;
    document.getElementById("line").style.animation= `none`;
    document.getElementById("bottom").style.animation= `none`;
        
    reset();
    }
    
    function startTime() {
        
        timeRunning=true;
        runTime = setInterval(function(){iterate()},1000);
        slider.disabled = true;
        document.getElementById("top").className="top1";
        document.getElementById("line").className="line";
        document.getElementById("bottom").className="bottom1";
        document.getElementById("top").style.animation= `top ${slider.value*60}s linear`;
        document.getElementById("line").style.animation= `line ${slider.value*60}s linear`;
        document.getElementById("bottom").style.animation= `bottom ${slider.value*60}s linear`;
        
        document.getElementById("top").style.animationPlayState="running";
        document.getElementById("line").style.animationPlayState="running";
        document.getElementById("bottom").style.animationPlayState="running";
    }
    function stopTime() {
        timeRunning=false;
        clearInterval(runTime);
        slider.disabled = false;
        document.getElementById("top").style.animationPlayState ="paused" ;
        document.getElementById("line").style.animationPlayState="paused";
        document.getElementById("bottom").style.animationPlayState="paused";
       
        document.getElementById("start").addEventListener("click",startTime, {once: true});
    }
    function iterate() {
        console.log(time1)
        
            
        if(sec<0){
            time1--;
            sec=59;
        }
        if(sec>-1 && time1!=-1) {
            if(sec<10){
                document.getElementById("displayTime").innerHTML=(time1+":"+sec.toString().padStart(2,"0"));
            }
            else {
                document.getElementById("displayTime").innerHTML=(time1+":"+sec);
            }
            
            sec--;
        }
        else {
            document.getElementById("displayTime").innerHTML="Take a Break";
            stopTime();
            reset();
        }
    }
    function reset() {
        if(!timeRunning) {
            time1 = slider.value-1;
            sec = 59;
            var runTime=null;
            document.getElementById("top").classList.remove("top1");
            document.getElementById("line").classList.remove("line");
            document.getElementById("bottom").classList.remove("bottom1");
        }
    }
    
}
init();
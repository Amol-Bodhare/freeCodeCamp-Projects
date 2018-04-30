$(document).ready(function() {
    let order = [];
    let index1 = 0;
    var c=0,c1=0;
    let strictBoolean=false;
    let x=null;
    let y=null;
    const complementColors = ['#f9dd62','#33ff8f','#ed3b44','#85e0ff'];
    $('#startBtn').click(start);
    $('#but1').click(1,check);
    $('#but2').click(2,check);
    $('#but3').click(3,check);
    $('#but4').click(4,check);
    $('#strictBtn').click(strict);
    disableButtons();
    function start() {
        index1=0;
        c1=0;
        c=0;
        clearTimeout(x);
        clearTimeout(y);
        $("#startBtn").effect( "shake", {times:1,direction:"up",distance:1}, 500 );
        //$('#startBtn').html('Restart');
        enableButtons();
        for(var i=0;i<20;i++) {
            let index = Randomize();
            order[i]=index;
        }
        console.log(order);
        console.log(index1);
        display(order[0],index1+1);

    }
    function stop() {
        $('#startBtn').html('Start');
        disableButtons();
    }
    function strict() {
        if(strictBoolean) {
            strictBoolean = false;
            $('#strictBtn').css('background-color','');
            $('#strict-status').css('color','');
        } else {
            strictBoolean = true;
            $('#strict-status').css('color','red');
            $('#strictBtn').css('background-color','red');
            
        }
    }
    function display(num,count) {
        disableButtons();
        
        var tempColor=null;
        y=setTimeout(function () {
            let sound = document.getElementById("Audio"+num+""); 
            sound.load();
            sound.play(); 
            $('#status').html(`${index1+1}`);
            tempColor = $('#but'+num+'').css('background-color');
            $('#but'+num+'').delay(1000).css('background-color',complementColors[num-1]);
        },1000);
        x=setTimeout(function () {
            
            $('#but'+num+'').css('background-color',tempColor);
            if(c>=(count-1)){
                console.log("clear:"+c);
                clearTimeout(x);
                c1=0;
                enableButtons();
                
                return;
            }
            c++;
            display(order[c],count);
        }, 2000);
    }
    
    function check(event) {
        var temp=null;
        temp = $('#but'+event.data+'').css('background-color');
        console.log(temp);
        $('#but'+event.data+'').css('background-color',complementColors[event.data-1]);
        var t = setTimeout(function() {
            $('#but'+event.data+'').css('background-color',temp);
        },200);
        
        let sound = document.getElementById("Audio"+event.data+""); 
        sound.load();
        sound.play();        
        if(event.data === order[c1]) {
            console.log("right");
            c1++;
            
            
        } else {
            console.log('wrong step---- Listen again');
            $('#status').html('Wrong step - try again');
            if(strictBoolean) {
                start();  
            } 
            c=0;
            display(order[0],index1+1);
            

            
        }
        if(c1===index1+1){
            
            index1++;c=0;
            console.log("index is: "+index1)
            if(index1<20) {
                display(order[0],index1+1);
            } else {
                $('#status').html(`Victory`);
                stop(); 
            }
        }
    }
    
    function Randomize() {
        return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    }
    function disableButtons() {
        $('#but1').css({pointerEvents: "none"})
        $('#but2').css({pointerEvents: "none"})
        $('#but3').css({pointerEvents: "none"})
        $('#but4').css({pointerEvents: "none"})
    }
    function enableButtons() {
        $('#but1').css({pointerEvents: "auto"})
        $('#but2').css({pointerEvents: "auto"})
        $('#but3').css({pointerEvents: "auto"})
        $('#but4').css({pointerEvents: "auto"})
    }
    
});
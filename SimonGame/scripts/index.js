$(document).ready(function() {
    let order = [];
    let index1 = 0;
    var c=0,c1=0;
    let strictBoolean=false;
    let x=null;
    let y=null;
    
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
        $('#startBtn').html('Restart');
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
        } else {
            strictBoolean = true;
            $('#strictBtn').css('background-color','red');
            
        }
    }
    function display(num,count) {
        disableButtons();
        y=setTimeout(function () {
            $('#status').html(`${index1+1}`);
        $('#but'+num+'').delay(1000).css('color','red');
        },1000);
        x=setTimeout(function () {
            
            $('#but'+num+'').css('color','black');
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
        let sound1 = document.getElementById("Audio"+event.data+""); 
        sound1.play();        
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
        $('#but1').prop('disabled',true);
        $('#but2').prop('disabled',true);
        $('#but3').prop('disabled',true);
        $('#but4').prop('disabled',true);
    }
    function enableButtons() {
        $('#but1').prop('disabled',false);
        $('#but2').prop('disabled',false);
        $('#but3').prop('disabled',false);
        $('#but4').prop('disabled',false);
    }
});
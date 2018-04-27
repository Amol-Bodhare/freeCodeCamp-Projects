$(document).ready(function() {
    let order = [];
    let index1 = 0;
    $('#startBtn').click(start);
    $('#but1').click(1,check);
    $('#but2').click(2,check);
    $('#but3').click(3,check);
    $('#but4').click(4,check);
    function start() {
        
        for(var i=0;i<20;i++) {
            let index = Randomize();
            order.push({index: index,flag:false});
        }
        //console.log(order);

        display(order[0],index1+1);

    }
    var c=0;
    function display(num,count) {
        var y=setTimeout(function () {
        $('#but'+num.index+'').delay(1000).css('color','red');
        },1000);
        var x=setTimeout(function () {
            
            $('#but'+num.index+'').css('color','black');
            if(c>=(count-1)){
                console.log("clear");
                clearTimeout(x);
                return;
            }
            c++;
            display(order[c],count);
        }, 2000);
    }
    function check(event) {
        if(event.data === order[index1].index) {
            order[index1].flag=order[index1].flag ? false : true ;
            console.log(order);
            if(checkSequence()) {
            console.log("true");
           index1++;
           
           c=0;
           display(order[0],index1+1);
           } else {
                console.log("inner False");
           }
        } else {
            console.log("false");
        }
    }
    function checkSequence() {
        return true;
    }
    function Randomize() {
        return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    }
});
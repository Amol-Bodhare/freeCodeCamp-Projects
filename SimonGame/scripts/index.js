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
        console.log(order);

        display(order[0],index1+1);

    }
    var c=0,c1=0;
    function display(num,count) {
        var y=setTimeout(function () {
        $('#but'+num.index+'').delay(1000).css('color','red');
        },1000);
        var x=setTimeout(function () {
            
            $('#but'+num.index+'').css('color','black');
            if(c>=(count-1)){
                console.log("clear");
                clearTimeout(x);
                c1=0;
                clearOrder();
                return;
            }
            c++;
            display(order[c],count);
        }, 2000);
    }
    // display(order[0],index1+1);
    var checkflag=false;
    function check(event) {
        
        if(event.data === order[c1].index) {
            console.log("right");
            c1++;
            
            
        } else {
            console.log('wrong step---- Listen again');
            c=0;
            display(order[0],index1+1);
            

            
        }
        if(c1===index1+1){
            index1++;c=0;
            display(order[0],index1+1);
        }
    }
    function clearOrder() {
        for(var i=0;i<=index1;i++) {
            order[i].flag=false;
        }
    }
    function checkSequence() {
        var checksum = -1;
        for(var i=0;i<=index1;i++){
            if(order[i].flag == true) {
                checksum++;
            }
        }
        if(checksum === index1){
            return true;
        }
        else return false;
    }
    function Randomize() {
        return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    }
});
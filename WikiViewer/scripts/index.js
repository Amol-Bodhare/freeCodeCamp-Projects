var search = true;
function foo(obj){
  if(search && obj.hasOwnProperty('query')){
    document.getElementById("icon").setAttribute('class',"fa fa-times");
    document.getElementById("para").setAttribute('class', "center");
    var div = document.getElementById("div2");
    div.setAttribute('style',"text-align:center; padding:0%;");
    // Adding UL element
     var p = document.getElementById("div");
    var newElement = document.createElement("ul");
    newElement.setAttribute('id', "myList");
    p.appendChild(newElement);
   ///////////////////////////////////////////////////
  var keyArray = Object.keys(obj['query']['pages']);
  var myListHTML = "";
  for(var i=0; i<keyArray.length; i++){
    myListHTML=myListHTML+"<a href="+"https://en.wikipedia.org/?curid="+keyArray[i]+" target="+"_blank"+"><li class=w3-animate-bottom><strong>"+
      obj['query']['pages'][keyArray[i]]['title']+"</strong><br><br>"+obj['query']['pages'][keyArray[i]]['extract']+"</li></a><br>";  
  }
  document.getElementById("myList").innerHTML = myListHTML;
   search = false;  
  }
  else{
    console.log("no response");
    var elem = document.getElementById('myList');
    elem.parentNode.removeChild(elem);
     document.getElementById("myText").value = "";
    document.getElementById("icon").setAttribute('class',"fa fa-search");
    search = true;
  }
}
$( document ).ready(function() {
    console.log( "ready!" );
    $( "#myText" ).keypress(function() {
  
      if (event.keyCode === 13) {
        console.log( "Handler for .keypress() called." );
        search = true;
        searchWikipedia();
    }
});
});
function searchWikipedia(){
  var x = document.getElementById("myText").value;
  x=x.replace(/\&/g," ");
  
  var script = document.createElement("script");
  script.src="https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+x+"&callback=foo";
  document.body.appendChild(script);
   
}
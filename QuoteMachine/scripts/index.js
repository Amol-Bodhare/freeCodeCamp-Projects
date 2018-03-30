


function newQuote() {
    var hello="Hello World";
    var i=Math.floor(Math.random() * 10);
  

// retrieve the element
    var quoteElement = document.getElementById("quoteAndAuthor");
    quoteElement.style.visibility="hidden";
 
    $("#but1").click(function() {
      console.log("triggered");
      $("#quoteAndAuthor").removeClass("animated fadein");
      setTimeout(function(){
        $("#quoteAndAuthor").addClass("animated fadein");
      },200);
    });

    setTimeout(function(){
      quoteElement.style.visibility="visible";
    },200);
 
// or

// reset the transition by...
    document.getElementById('quote').innerHTML = quotes[i]['quote'];
    document.getElementById('author').innerHTML = quotes[i]['author'];
    var e = document.getElementById("tweet-quote");
    e.href="https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text="+quotes[i]['quote']+"";
    random_bg_color();
  
 
  
}
function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
 console.log(bgColor);
  
    document.body.style.background = bgColor;
    document.getElementById('but1').style.background=bgColor;
}
var quotes ={
  0 : {
    quote:"Don't cry because it's over, smile because it happened.",
    author:"-Dr. Seuss."
  },
  1 : {
    quote:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author:"- Albert Einstein."
  },
  2 : {
    quote:"Be the change that you wish to see in the world.",
    author:"- Mahatma Gandhi."
  },
  3 : {
    quote:"Every project is an opportunity to learn, to figure out problems and challenges, to engineer and re-engineer.",
    author:"- Amol Bodhare."
  },
  4 : {
    quote:"Learning never exhausts the mind.",
    author:"- Leonardo da Vinci."
  },
  5 : {
    quote:"I have not failed. I've just found 10,000 ways that won't work.",
    author:"- Thomas A. Edison."
  },
  6 : {
    quote:"Education is the most powerful weapon which you can use to change the world.",
    author:"- Nelson Mandela."
  },
  7 : {
    quote:"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author:"- Buddha."
  },
  8 : {
    quote:"It is during our darkest moments that we must focus to see the light.",
    author:"- Aristotle."
  },
  9 : {
    quote:"Nothing is impossible, the word itself says 'I'm possible'!",
    author:"- Audrey Hepburn."
  },
};
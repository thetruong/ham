
var compose      = document.getElementById('compose');
var hammer    = new Hammer.Manager(blue);
var swipe     = new Hammer.Swipe();

hammer.add(swipe);

hammer.on('swiperight', function(){
   $(compose).text("swipe right")  
});
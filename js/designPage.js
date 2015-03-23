//the number of notes on each page
var numOfNotes = 1;
var barWidth = 0; //the width of the colour bars in accordance to the number of notes on sheet
var notePosition = 0;
var noteArray = [];
var noteDrawerShow = false; //determines if the drawer is closed or open
var deleteTrue = false;

var image; //the notes

//shakeJS
function loadShake(){
	var myShakeEvent = new Shake({
		threshold: 15
	});
	myShakeEvent.start();
	window.addEventListener('shake', shakeEventDidOccur, false);
	function shakeEventDidOccur(){
		alert('Shake!');
	}
}

function playSounds(){
	var synth = new Tone.MonoSynth();
	 synth.toMaster();
	 
	 var playNotePosition = 0;
	 
	 //create a callback which is invoked every quarter note
	 Tone.Transport.setInterval(function(time){
		 //trigger middle C for the duration of an 8th note
		 
		  synth.triggerAttackRelease(noteArray[playNotePosition], "16n", time);
		  playNotePosition++;
		  console.log(playNotePosition);
		  if(playNotePosition > noteArray.length-1){
			playNotePosition = 0;
		  }
	  }, "4n");
	 
	// //start the transport
	 Tone.Transport.start();
 }
 
//user determines if they are using treble or bass
function trebleOrBass(symbol){
	if(symbol == "treble"){
		document.getElementById("symbolTreble").style.left = "0%";
		document.getElementById("symbolTreble").style.top = "25%";
		document.getElementById("symbolBass").style.display = "none";
		document.getElementById("musicSheet").style.display = "inline";
	}
	else if(symbol == "bass"){
		document.getElementById("symbolBass").style.left = "0%";
		document.getElementById("symbolBass").style.top = "25%";
		document.getElementById("symbolTreble").style.display = "none";
		document.getElementById("musicSheet").style.display = "block";
	}
	document.getElementById("chooseStaffText").style.display = "none";
	document.getElementById("bassText").style.display = "none";
	document.getElementById("trebleText").style.display = "none";
}

//opens the note drawer when a line is pressed
function openNotes(x){
	if(noteDrawerShow == true){
		//hide the drawer when clicked outside the drawer
		document.getElementById("showDrawer").style.display = "none";
		noteDrawerShow = false;
	}
	// else if(numOfNotes < 5 && noteDrawerShow == false){ //currently only allow up to 4 notes
	else if(noteDrawerShow == false){ //currently only allow up to 4 notes
		//show the note drawer
		document.getElementById("showDrawer").style.display = "block";
		noteDrawerShow = true;
		notePosition = x;
	}
}


//adds note to the sheet and sets its position
function noteToSheet(noteName){
	numOfNotes++;
	// var image = document.createElement("IMG");
	// image.setAttribute("src", "" + noteName + "");
	
	image = document.createElement("input");
	image.setAttribute("src", "" + noteName + "");
	image.setAttribute("type", "image");
	image.setAttribute("id", "note" + numOfNotes + "");
	image.setAttribute("onclick", "deleteNote(" + numOfNotes + ")");
	image.style.position = "absolute";
	image.style.height = "10vh";
	image.style.left = "" + (17 * numOfNotes) + "vw";
	image.style.top = "" + (18 + 4.5 * notePosition) + "%";
	
	noteArray.push("C" + notePosition + "");
	console.log(noteArray);
	
	if(noteDrawerShow == true){
		document.body.appendChild(image);
		//closes the note drawer if the note is clicked
		openNotes(-1);
	}
	else if(noteDrawerShow == false){
		image.style.display = "none";
	}
	
	if((numOfNotes - 1) % 3 == 0){
		var w = document.getElementsByClassName("noteDrawer");
		var x = document.getElementsByClassName("blackBar");
		var y = document.getElementsByClassName("whiteBar");
		var z = document.getElementsByClassName("tealBar");
		barWidth++;
		w[0].style.width = "" + (100 + barWidth * 50) + "%";
		for(var i = 0; i < 5; i++){
			x[i].style.width = "" + (100 + barWidth * 50) + "%";
		}
		for(var j = 0; j < 4; j++){
			y[j].style.width = "" + (100 + barWidth * 50) + "%";
		}
		for(var k = 0; k < 2; k++){
			z[k].style.width = "" + (100 + barWidth * 50) + "%";
		}
	}
}

function deletePressed(){
	deleteTrue = true;
	console.log("delete pressed");
	
}

function deleteNote(x){
	console.log(x);
	if(deleteTrue == true){
		var note = document.getElementById("note" + x + "");
		document.body.removeChild(note);
		noteArray[x-2] = null;
		console.log(noteArray);
	}
}

function addPressed(){
	playSounds();
}

loadShake();
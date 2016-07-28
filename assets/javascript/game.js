/*
	GOAL--> To make a trivia game that goes to new slides automatically via 2 methods
		method 1. timer count down to 0
		method 2. player selects answer

	the player will have X amount of time to answer each question. 
	the answer along with the correct answer will be displayed following a choise (or a time out)
	then the game will move onto the next question
	at the end of the game the amount of correct and incorrect aswers will be displayed (possibly with the average time to complete)

	The Game Story board
	Beginning
		The player will only se a start button. they will then select the star button to begin the game
	Game
		The player will have a set amoount of time to answer a series of questions. The amount of time for each question will be the same. Each question will have 4 options one of which will be the correct answer.
		The player will select one of the 4 options. If the player is incorrect the screen will tell the player that they are in correct and then display the correct answer. If the player is correct then the screen will tell the player and display the answer. If the player runs out of time the screen will again tell the player this happend and what the correct answer is
	End
		After every question is answered the game will display the total correct, incorrect, and unanswered questions. there will also be an option to start over. If the player chooses this option the game should start over without need for the page to reload. 


	EXTRA- Make different games based on difficulty can use less of the objects depending on which option picked
*/

/*
PLAN- make 2 arrays of objects

	array 1 = question objects - store questions and functions for selecting questions
	array 2 = answer objects - store 2 answer elements (page re-write) one for correct answers, one for wrong answers
	
things i need 
	2 buttons 1 to start 1 to restart
	start page genenerator
	end page generator
	question generator
	answer generator
	objects to store the info
	for questions and answers
	possable functons
	question generator 
	answer generator
*/

var correctAnswer=false;
// timer variable
var timer; //using for this -> setInterval(decrement, 1000); clearinterval(timer);


//question object that will stor the question guesses and answer
var question={
	text:"",
	answer:"",
	guesses:[],
	makeQuestion:function(question,answer,guesses){
		this.text=question;
		this.answer=answer;
		this.guesses=guesses;
	}
}



//the questions array 
questions = new Array(4);
	function fillQuestions(){
			questions[0] = new question.makeQuestion('What is the Grandmothers Name?',"Emily" , ["Emily","Susan","Lorelai","Betty"]);
			questions[1] = new question.makeQuestion('What is the name of the town the show takes place in?',"Stars Hallow" , ["Stars Hallow","Hartford","Woodbury","Litchfield"]);
			questions[2] = new question.makeQuestion("Which journalist does Rory idolize?","Christiane Amanpour",["Christiane Amanpour","Tom Brokaw","Peter Jennings","Ira Glass"]);
			questions[3] = new question.makeQuestion("Which major character was originally scripted as a woman?","Luke",["Luke","Kirk","Taylor","Andrew"])
		}

//the start and end objects are stored structurly the same as the questions
var start = {
		text:"Start",
		buttonName:"Start",
		difficulty:["easy","medium","hard"],
	}
var end = {
	text:"End",
	buttonName:"restart",
	correct:0,
	incorrect:0,
	unanswered:0,
}
//pages should always be layed out the same way
// this function will make a generic page
function choosePage(pageObject){
	//clear the elements of the page
	console.log("clearing");
	clearPage();
	// populate the time 
	//if it's start then display the start button
	console.log("checking if start");
	if(pageObject.text=="Start"){
		console.log("adding start button");
		$("#timer").html("<h1 id='start' >"+start.text+"</h1>")
	}
	//if the object is the end make the reset button 
	else if(pageObject.text=="End"){
		console.log("adding restart button and displaying correct,incorrect, and unanswered questions");
	}
	//console.log("making regular page");

}
	


//sets up the page for teh question
function makePage(pageObject){
	console.log("clearing");
	clearPage();
	/*<div id="timer" class="row"></div>
			<div id="question" class="row"></div>
			<div id="answers"></div>*/
	//set a time counter
	newCounter=$("<h1/>").attr('id', 'count').text(60);
	$("#timer").append(newCounter);
	//set up the interval decreaser
	timer =setInterval(function(){
		tmpVal=Number($("#count").html());
		tmpVal--;
		$("#count").html(tmpVal);
	}, 1000);
	//add the question
	var question=$("<h2/>").attr('id', 'question').text(pageObject.text)
	$("#question").append(question);
	//add the answers
	for (var i = 0; i < pageObject.guesses.length; i++) {
		var guess =$("<h3/>").addClass("guess").text(pageObject.guesses[i]);
		$("#answers").append(guess);
	}
	//creat the onClick function controlling the guesses
	$(".guess").on("click",function(){
		if($(this).html()===pageObject.answer)
		console.log($(this).html())
	})
}

/*function questionResult(bool){

}*/

function clearPage(){
	clearInterval(timer);
	$("#timer").empty();
	$("#question").empty();
	$("#answers").empty();
}
 
$(document).ready(function() {
	fillQuestions();
	//make the start page
	choosePage(start);
	//when the starbutton is clicked 
	$("#start").on("click",function(){
		//go to first question
		makePage(questions[0]);
	})

	//console.log(questions)

});
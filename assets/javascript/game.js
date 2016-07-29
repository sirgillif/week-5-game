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

// timer variable
var timer; //using for this -> setInterval(decrement, 1000); clearInterval(timer);
//keep track of the question number
var index=0;

//question object that will stor the question guesses and answer
var question={
	text:"",
	answer:"",
	guesses:[],
	makeQuestion:function(question,answer,guesses){
		// console.log("making questions")
		this.text=question;
		this.answer=answer;
		var tempArray=[]
		//making the answers display randomly each game
		// console.log("Randomizing")
		// console.log("origional tempArray length: "+tempArray.length)
		// console.log("origional guesses length: "+guesses.length)
		while (guesses.length>0) {
			var randNum = Math.floor(Math.random()*guesses.length);
			// console.log(randNum)
			tempArray.push(guesses[randNum]);
			// console.log(tempArray)
			guesses.splice(randNum, 1);
			// console.log(guesses)
		}
		// console.log("Final tempArray : "+tempArray)
		this.guesses=tempArray;
	}
}



//the questions array 
questions = new Array(9);
	function fillQuestions(){
			questions[0] = new question.makeQuestion('What is the Grandmothers Name?',"Emily" , ["Emily","Susan","Lorelai","Betty"]);
			questions[1] = new question.makeQuestion('What is the name of the town the show takes place in?',"Stars Hallow" , ["Stars Hallow","Hartford","Woodbury","Litchfield"]);
			questions[2] = new question.makeQuestion("Which journalist does Rory idolize?","Christiane Amanpour",["Christiane Amanpour","Tom Brokaw","Peter Jennings","Ira Glass"]);
			questions[3] = new question.makeQuestion("Which major character was originally scripted as a woman?","Luke",["Luke","Kirk","Taylor","Andrew"])
			questions[4] = new question.makeQuestion("Who was Richard engaged to before Emily?","Pennilyn Lott",["Pennilyn Lott","Sweetie Nelson","Natalie Swope","Constance Betterton"])
			questions[5] = new question.makeQuestion("To earn extra credit, Chilton students sang the school song in what language?","Latin",["Latin","Greek","Farsi","Mandarin"])
			questions[6] = new question.makeQuestion("What was Luke’s nickname in high school?","Butch",["Butch","Luke","Trekkie","Town Loner"])
			questions[7] = new question.makeQuestion("","",["","","",""])
			questions[8] = new question.makeQuestion("","",[,"","",""])
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
function startPage(pageObject){
	//clear the elements of the page
	//console.log("clearing");
	clearPage();
	//console.log("adding start button");
	$("#timer").html("<h1 id='start' >"+start.text+"</h1>")

	$("#start").on("click",function(){
		//go to first question
		makePage(questions[index]);
	});
}
function endPage(pageObject){

	//if the object is the end make the reset button 
	clearPage();
	//console.log("adding reset button");
	$("#answers").html("<h1 id='restart' >"+end.buttonName+"</h1>")
	$("#question").html("<h2> Correct Answers: "+end.correct+"</h2>");
	$("#question").append("<h2>Incorrect Answers:"+end.incorrect+"</h2>");
	$("#question").append("<h2>Unanswered Questions:"+end.unanswered+"</h2>");
	//console.log("making regular page");
	console.log("adding restart button and displaying correct,incorrect, and unanswered questions");
	$("#restart").on("click",function(){
		
		end.correct=0;
		end.incorrect=0;
		end.unanswered=0;
		//redo the questions
		fillQuestions();
		//restart the game
		startPage(start);
	})
	//console.log(questions)
}
//sets up the page for teh question
function makePage(pageObject){
	//console.log("clearing");
	clearPage();
	
	//set a time counter
	newCounter=$("<h1/>").attr('id', 'count').text(20);
	$("#timer").append(newCounter);
	//set up the interval decreaser
	timer =setInterval(function(){
		var tmpVal=Number($("#count").html());
		tmpVal--;
		$("#count").html(tmpVal);
		if(tmpVal==0){
			//go to unanswered page
			end.unanswered++;
			clearInterval(timer);
			answerpage("unanswered",pageObject.answer);
		}
	}, 1000);
	//add the question
	var question=$("<h1/>").attr('id', 'question').text(pageObject.text)
	$("#question").append(question);
	//add the answers
	for (var i = 0; i < pageObject.guesses.length; i++) {
		var guess =$("<h2/>").addClass("guess").text(pageObject.guesses[i]);
		$("#answers").append(guess);
	}
	//creat the onClick function controlling the guesses
	$(".guess").on("click",function(){
		clearInterval(timer);
		if($(this).html()===pageObject.answer){
			console.log("correct")

			end.correct++;
			//make the correct answer page
			answerpage("correct",pageObject.answer);
		}
		else{
			//console.log("incorrect")
			end.incorrect++;
			answerpage("incorrect",pageObject.answer);	
		}
	})
}
  /*<div id="timer" class="row"></div>
	<div id="question" class="row"></div>
	<div id="answers"></div>*/
function answerpage(ansType,answer){
	var tmpVal=3;
	timer =setInterval(function(){
		tmpVal--;
		if(tmpVal<0){
			//go to next question
			clearInterval(timer);
			if(index<questions.length-1){
				makePage(questions[++index]);
			}
			else{
				endPage(end);
			}
		}
	}, 1000);
	if(ansType=="correct"){
		$("#question").html("<h1>Correct!</h1>");
	}else if(ansType=="incorrect"){
		$("#question").html("<h1>Incorrect!</h1>");
	}
	else{
		$("#question").html("<h1>Oops, ran out of time!</h1>");
	}
	$("#answers").html("<h2>The correct answer was "+answer+".</h2>")
}

//reset the page
function clearPage(){
	clearInterval(timer);
	$("#timer").empty();
	$("#question").empty();
	$("#answers").empty();
}
 
$(document).ready(function() {
	fillQuestions();
	//make the start page
	startPage(start);
	//when the starbutton is clicked 
});
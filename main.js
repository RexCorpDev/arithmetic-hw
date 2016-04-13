document.addEventListener('DOMContentLoaded', init);

function getRandomNum(size) {
	return Math.floor(Math.random() * size);
}

function init() {
	var controlSelector = 0;
	document.getElementById('submitBtn').addEventListener('click', submitClicked);
	document.getElementById('clearBtn').addEventListener('click', clearClicked);
	document.getElementById('skipBtn').addEventListener('click', skipClicked);
	document.getElementById('buttons').addEventListener('click', numButtonClicked);
	document.getElementById('sign').addEventListener('click', signClicked);
	document.getElementById('decimal').addEventListener('click', decimalClicked);
} //END of init()
var firstNumEl = document.getElementById('firstNumber');
var operatorEl = document.getElementById('operator');
var secondNumEl = document.getElementById('secondNumber');
var answerEl = document.getElementById('answerField');
var results = document.getElementById('results');
var resultsColor = document.getElementById('results').style.color;
var numberone = 0;
var numbertwo = 0;
var operator = ['+', '-', 'x'];
var answer = 0;
//var correctAnswer = calcAnswer[chosenOperator](chosenNumber1, chosenNumber2);
//gen problem by calling a var called "problem" which has function callers in their value's
//gen answer by calling problem index values.
function calcAnswer(operator, x, y) {
	var result = 0;
	switch (operator) {
		case '+':
			result = parseInt(x) + parseInt(y);
			break;
		case '-':
			result = x - y;
			break;
		case 'x':
			result = x * y;
			break;
	}
	return result;
}

function createExercise() {
	firstNumEl.textContent = getRandomNum(12);
	operatorEl.textContent = operator[getRandomNum(3)];
	secondNumEl.textContent = getRandomNum(12);
	answer = calcAnswer(operatorEl.textContent, firstNumEl.textContent,
		secondNumEl.textContent);
	console.log('answer = ', answer);
}

function numButtonClicked(event) {
	if (event.target.matches('.num')) {
		return answerEl.value += event.target.textContent;
	}
}

function signClicked(event) {
	if (event.target.matches('#sign')) {
		if (answerEl.value == "") {
			return answerEl.value = "-";
		} else if (answerEl.value == "-") {
			return answerEl.value = "+";
		} else if (answerEl.value == NaN) {
			return answerEl.value = "-";
		} else if (answerEl.value != "") {
			var convertToInt = parseInt(answerEl.value);
			var changeSign = convertToInt * -1;
			return answerEl.value = changeSign;
		}
	}
}

function decimalClicked() {
	if (event.target.matches('#decimal')) {
		return answerEl.value += event.target.textContent;
	}
}

function submitClicked(event) {
	if (event.target.matches('#submitBtn')) {
		//if EMPTY...
		if (answerEl.value == " " | answerEl.value == "") {
			setTimeout(function() {
				return results.textContent = "EMPTY! Pick an answer";
			}, 1000);
			setTimeout(function() {
				return results.textContent = "";
			}, 3500);
		}
		//if RIGHT...
		else if (answerEl.value == answer) {
			setTimeout(function() {
				return results.textContent = "CORRECT!"
			}, 1000);
			setTimeout(function() {
				return answerEl.value = "";
			}, 3500);
			setTimeout(function() {
				return results.textContent = "";
			}, 2500);
			setTimeout(function() {
				return createExercise()
			}, 2500);
			//if WRONG...
		} else if (answerEl.value != answer) {
			setTimeout(function() {
				return results.textContent = "WRONG! Try again"
			}, 1000);
			setTimeout(function() {
				return results.textContent = "";
			}, 2500);
			setTimeout(function() {
				return answerEl.value = ""
			}, 1002);
		}
	}
}

function clearClicked(event) {
	if (event.target.matches('#clearBtn')) {
		return answerEl.value = "";
	}
}

function skipClicked(event) {
	if (event.target.matches('#skipBtn')) {
		return createExercise();
	}
}
createExercise();

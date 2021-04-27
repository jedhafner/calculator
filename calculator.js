//Stored Values
let currentVariable = 0;
let operand1 = 0;
let operator = "";
let operand2 = 0;

let displayLengthMax = 15;

function resetStoredValues(){
	currentVariable = 0;
	operand1 = 0;
	operator = "";
	operand2 = 0;
}

function divide(x,y){
	if (operand2 === 0){
		operand1 = 0;
	} else {
		operand1 = x/y;
	}
}

const display = document.querySelector('.display');
display.textContent = currentVariable;

const keypad = document.querySelector('.keypad');

keypad.addEventListener('click', function(event) {
	let clicked = event.target;
	let clickedText = clicked.textContent;
	let clickedClass = clicked.className;

	switch (clickedClass){
		case "clear":
			clear();
			break;
		case "decimal":
			decimal();
			break;
		case "plusMinusPercent":
			plusMinusPercent();
			break;
		case "numeral":
			numeral();
			break;
		case "operator":
			operate();
	}
	
	if (operand1 !== 0 && currentVariable === 0){
		display.textContent = operand1;
	} else {
		display.textContent = currentVariable;
	}

	console.log("currentVariable: "+currentVariable+" cV type: "+typeof currentVariable+"\n operand1: "
	+operand1+"\n operator: "+operator+"\n operand2: "+operand2);


	function clear(){
		resetStoredValues();
	}

	function decimal(){
		if (String(currentVariable).includes(".")){
			return;
		} else {
			currentVariable = String(currentVariable);
			currentVariable+=".";
			
		}
		
	}

	function plusMinusPercent(){
		if (operand1 !== 0 && currentVariable === 0){
			if (clickedText === "%"){
				operand1/=100;
			} else {
				operand1*=-1;
			}
		} else {
			if (clickedText === "%"){
				currentVariable/=100;
			} else {
				currentVariable*=-1;
			}
		}
	}

	function numeral(){
		if (String(currentVariable).length >= displayLengthMax){
			return;
		}
		if (String(currentVariable).includes(".")){
			currentVariable+=clickedText;
		} else if (currentVariable%1 === 0){
			currentVariable*=10;
			if (currentVariable < 0){
				currentVariable-=parseInt(clickedText, 10);
			} else {
				currentVariable+=parseInt(clickedText, 10);
			}
		} 
	}
	
	function operate(){
		if (operator === ""){
		operand1 = Number(currentVariable);
		operator = clickedText;
		currentVariable = 0;
		} else if (operator !== "") {
			operand2 = Number(currentVariable);
			switch(operator){
				case '+':
					operand1 = operand1 + operand2;
					break;
				case '-':
					operand1 = operand1 - operand2;
					break;		
				case '*':
					operand1 = operand1 * operand2;
					break;
				case '/':
					divide(operand1,operand2);
					break;
				case '=':
					operand1 = operand1;
				}
			if (clickedText === "=") {
				operator = "";
			}else{
				operator = clickedText;
			}
			currentVariable = 0;
			}
		}
		if(display.textContent.length > displayLengthMax){
			let shortened = display.textContent.substring(0,displayLengthMax);
			display.textContent = shortened;
		}
})



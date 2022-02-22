/// Getting divs

let inputCounter = document.getElementById("time");
let startButton = document.getElementById("startButton");
let writingArea = document.getElementById("writingArea");
let exportButton = document.getElementById("export");
let muteAll = document.getElementById("muteAll");

let saveText = document.getElementById("export");
let timerDisplay = document.getElementById("displayTimer");
let displayEstimation = document.getElementById("displayEstimation");

// Scenes

let menu = document.getElementById("menu");
let writing = document.getElementById("writing");

/// Other Variables

let isAlarmed = false;
var time = inputCounter.value * 60;
let isAllMuted = false;
let chance = 0;
let isBotClick = false;
var interval;
var intervalTimer;

let clockSound = new Audio("time.wav");
clockSound.loop = false;

let explosionSound = new Audio("explosion.wav");
explosionSound.loop = false;

/// Event Listeners

startButton.addEventListener('click', () => {
	if (inputCounter.value < 0.1 || inputCounter.value > 150) {
		alert("El numero es invalido (el numero es menor a 0, es mayor a 2 horas y media o es invalido)");
	}else{
		isAllMuted = false;
		menu.style.display = "none";
		writing.style.display = "inline";
		console.log(time);
		timerDisplay.innerHTML = `<h1>${time}</h1>`;
		updateDisplay(time);
		startTimer(time);
	}
})

inputCounter.addEventListener('input', () => {
	if (inputCounter.value <= 0) {
		inputCounter.style.border = "solid #f00 2.5px";
		inputCounter.style.color = "#f00";
	}else{
		inputCounter.style.border = "solid #444 2.5px";
		inputCounter.style.color = "#000";
	}
	var time = inputCounter.value * 60;
	console.log("Tiempo crudo: " + time);
})

writingArea.oncopy = event => {
	if (!isBotClick) {
		event.preventDefault();
		event.clipboardData.setData('text/plain', "¡Por tramposo!");
	}
}

muteAll.addEventListener('click', () => {
	if (!isAllMuted) {
		isAllMuted = true;
		muteAll.value = "Desilenciar todos los sonidos";
	}else{
		isAllMuted = false;
		muteAll.value = "Silenciar todos los sonidos";
	}
})

exportButton.onclick = event => {
	if (writingArea.value == "") {
		alert("No has escrito nada.");
	}else{
		isBotClick = true;
		writingArea.focus();
		document.execCommand('selectAll');
		document.execCommand('copy');
		menu.style.display = "block";
		writing.style.display = "none";
		alert("Copiado al portapapeles, pegalo en algun archivo.");
		writingArea.value = "";
		time = 0;
		clearInterval(intervalTimer);
		isAllMuted = true;
		isBotClick = false;
	}
}

// Functions

function startTimer(times) {
	var time = inputCounter.value * 60;
	updateDisplay(time);
	console.log(times);
	intervalTimer = setInterval(function() {
		if (time <= 0) {
			updateDisplay();
			if (!isAllMuted) {
				explosionSound.play();
			}
			console.log("Se acabo el tiempo!");
			menu.style.display = "block";
			writing.style.display = "none";
			alert("Se acabo el tiempo! Lo lamentamos mucho, asi son las cosas...");
			writingArea.value = "";
			time = 0;
			clearInterval(intervalTimer);
		}else{ 
			if (time == 60 && !isAlarmed) {
				let alertSound = new Audio("alarm.wav");
				alertSound.loop = false;
				alertSound.play();
				isAlarmed = true;
			}
			time--;
			updateDisplay(time);
			if (!isAllMuted) {
				clockSound.play();
			}
			console.log(time); 
		}
	}, 1000)
}

function updateDisplay(time) {

	if (time >= 60) {
		timerDisplay.style.color = "#000";
		timerDisplay.innerHTML = `<h1><b>${time}</b></h1>`;
	}else if (time >= 30) {
		timerDisplay.style.color = "#ff0";
		timerDisplay.innerHTML = `<h1><b>${time}</b></h1>`;
	}else if (time >= 15) {
		timerDisplay.style.color = "#EF7F1A";
		timerDisplay.innerHTML = `<h1><b>${time}</b></h1>`;
	}else if (time >= 10) {
		timerDisplay.style.color = "#f00";
		timerDisplay.innerHTML = `<h1><b>${time}</b></h1>`;
	}else{
		timerDisplay.style.color = "#781008";
		timerDisplay.innerHTML = `<h1><b>${time}</b></h1>`;
	}

	/* 
		2 horas y media = 9000s (7200s + 1800s)
		2 horas         = 7200s (3600s * 2)
		1 hora y media  = 5400s (3600s + 1800s)
		1 hora          = 3600s (1800s * 2)
		Media hora      = 1800s (3600s / 2)
		15 minutos      = 900s (1800s / 2)
	*/

	if (time >= 7200) {
		displayEstimation.innerHTML = `<h1>Queda mas de 2 horas</h1>`;
	}else if (time >= 5400) {
		displayEstimation.innerHTML = `<h1>Queda menos de 2 horas</h1>`;
	}else if (time >= 3600) {
		displayEstimation.innerHTML = `<h1>Quedan menos de 1 hora y media</h1>`;
	}else if (time >= 1800) {
		displayEstimation.innerHTML = `<h1>Queda menos de 1 hora</h1>`;
	}else if (time >= 900) {
		displayEstimation.innerHTML = `<h1>Queda menos media hora</h1>`;
	}else if (time >= 600) {
		displayEstimation.innerHTML = `<h1>Quedan mas de 15 minutos</h1>`;
	}else if (time >= 300) {
		displayEstimation.innerHTML = `<h1>Quedan mas de 5 minutos</h1>`;
	}else if (time >= 60) {
		displayEstimation.innerHTML = `<h1>Quedan muy pocos minutos...</h1>`;
	}else{
		displayEstimation.innerHTML = `<h1>Quedan segundos...</h1>`;
	}
}
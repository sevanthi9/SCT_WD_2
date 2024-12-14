let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const lapButton = document.getElementById('lapButton');
const resetButton = document.getElementById('resetButton');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);
    isRunning = true;
    startStopButton.textContent = 'Pause';
    lapButton.disabled = false;
    resetButton.disabled = false;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    startStopButton.textContent = 'Start';
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00.00';
    lapsList.innerHTML = '';
    isRunning = false;
    startStopButton.textContent = 'Start';
    lapButton.disabled = true;
    resetButton.disabled = true;
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

lapButton.addEventListener('click', recordLap);
resetButton.addEventListener('click', resetStopwatch);

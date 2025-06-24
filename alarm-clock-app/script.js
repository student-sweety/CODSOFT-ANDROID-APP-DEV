const alarmInput = document.getElementById('set-time');
const setAlarmButton = document.getElementById('set-alarm');
const stopAlarmButton = document.getElementById('stop-alarm');
const snoozeAlarmButton = document.getElementById('snooze-alarm');
const snoozeAlarmTime = document.getElementById('snooze-time-min');
const snoozeMsg = document.getElementById('snooze-msg');
const alarmTimeDisplay = document.getElementById('alarm-time');
const alarmSound = document.getElementById('alarm-sound');
const alarmNotifDisplay = document.getElementById('alarm-notif');
const alarmSoundSelect = document.getElementById('alarm-sound-select');
let alarmTimeout;

//console.log(alarmSound);
//console.log(snoozeAlarmTime)

const currentTime = document.getElementById('curTime');
const currentDate = document.getElementById('curDate');
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const time = new Date();
const hours = time.getHours();
const minutes = time.getMinutes();
const seconds = time.getSeconds();
const date = time.getDate();
const month = time.getMonth();
const year = time.getFullYear();

currentTime.innerText =`${hours} : ${minutes} : ${seconds}`;
currentDate.innerText =`${date}-${monthNames[month]}-${year}`

function updateCurrentTime() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    currentTime.innerText = `${hours} : ${minutes} : ${seconds}`;
}


setInterval(updateCurrentTime, 1000);

setAlarmButton.addEventListener('click', () => {
    const alarmTime = alarmInput.value;
    const alertMsg = document.getElementById('alert-msg');
    if (!alarmTime) {
        alertMsg.innerText = "Please enter a valid  time input for alarm...";
        return;
    }

    const selectedSound = alarmSoundSelect.value;
    alarmSound.src = selectedSound;

    const now = new Date();
    const [alarmHours, alarmMinutes] = alarmTime.split(':').map(Number);

    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHours, alarmMinutes);

    const timeUntilAlarm = alarmDate - now;

    if (timeUntilAlarm <= 0) {
        alert("Please select a future time for the alarm...");
        return;
    }

    setAlarmButton.style.display = 'none';
    stopAlarmButton.style.display = 'none';
    snoozeAlarmButton.style.display = 'none';

    alarmTimeDisplay.innerText = `Alarm set for ${alarmHours} : ${alarmMinutes}`;
    // console.log(`Alarm scheduled in ${timeUntilAlarm /1000} second`);

    alarmTimeout = setTimeout(() => {
        playAlarmSound();
        alarmNotifDisplay.innerText = 'Alarm! Time to wake up..!';


        setAlarmButton.style.display = 'none';
        stopAlarmButton.style.display = 'block';
        snoozeAlarmButton.style.display = 'block';
    }, timeUntilAlarm);
});

stopAlarmButton.addEventListener('click', () => {
    stopAlarm();
});

snoozeAlarmButton.addEventListener('click',() => {
    snoozeAlarm();
});

function playAlarmSound() {
    alarmSound.play().catch(error => {
        console.error("playback error: ", error);
    });
}

function snoozeAlarm() {
    const snoozeMinutes = parseInt(snoozeAlarmTime.value, 10);

    if(snoozeAlarm.paused){
        snoozeMsg.innerText = "No active alarm to snooze..!";
    }

    if (isNaN(snoozeMinutes) || snoozeMinutes <= 0) {
        snoozeMsg.innerText = "please enter a valid snooze time.";
        return;
    }

    snoozeMsg.innerText = `Alarm snoozed for ${snoozeMinutes} minutes.`;

    alarmSound.pause();
    alarmSound.currentTime = 0;
    clearTimeout(alarmTimeout); //clear the previous alarm

    alarmTimeout = setTimeout(()  => {
        playAlarmSound();
        alarmNotifDisplay.innerText = "Alarm! Time to wake up!";
    }, snoozeMinutes * 60000);

    setAlarmButton.style.display = 'none';
    stopAlarmButton.style.display = 'block';
    snoozeAlarmButton.style.display = 'none ';
    alarmTimeDisplay.innerText = '';
    alarmNotifDisplay.innerText = '';


}

function stopAlarm() {
    clearTimeout(alarmTimeout);
    setAlarmButton.style.display = 'block';
    stopAlarmButton.style.display = 'none';
    snoozeAlarmButton.style.display = 'none';
    alarmTimeDisplay.innerText = '';
    alarmNotifDisplay.innerText = '';
    snoozeMsg.innerText = '';
    alarmInput.value = '';
    snoozeAlarm.value = '';
    alarmSound.pause();
    alarmSound.currentTime = 0;
}
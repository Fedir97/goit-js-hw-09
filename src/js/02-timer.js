// Описан в документации
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStart = document.querySelector("[data-start]")
const input =  document.querySelector("#datetime-picker")
const daysValue = document.querySelector("[data-days]")
const hoursValue = document.querySelector("[data-hours")
const minutesValue = document.querySelector("[data-minutes]")
const secondsValue = document.querySelector("[data-seconds")
let timer = null;

const currentDate = Date.now();


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0])
        btnStart.disabled = true;
    
     if(selectedDates[0] < currentDate ){
        Notiflix.Notify.failure("Please choose a date in the future") 
   
     }
      if(selectedDates[0] > currentDate ){
     btnStart.disabled = false;
      }
    },
  };

  flatpickr(input, options) 

  btnStart.addEventListener("click", startTimer);

  
  function startTimer() {
    timer = setInterval(() => {
      const dateChoosenMs = new Date(input.value.replace(/-/g, '/')).getTime();
      const now = new Date().getTime();
      const timeLeft = dateChoosenMs - now;

      const { days, hours, minutes, seconds } = convertMs(timeLeft);

      daysValue.innerHTML = days < 10 ? addLeadingZero(days) : days;
      hoursValue.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
      minutesValue.innerHTML = minutes < 10 ? addLeadingZero(minutes) : minutes;
      secondsValue.innerHTML = seconds < 10 ? addLeadingZero(seconds) : seconds;

      if (timeLeft < 1000) {
        clearInterval(timer);
        startBtn.disabled = false;
      }
    }, 1000);
  }


  function addLeadingZero(value) {
    const stringValue = String(value);
    return stringValue.padStart(2, '0');
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

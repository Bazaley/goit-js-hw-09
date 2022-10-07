import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const daysContentRef = document.querySelector('[data-days]');
const hoursContentRef = document.querySelector('[data-hours]');
const minutesContentRef = document.querySelector('[data-minutes]');
const secondsContentRef = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkTime(selectedDates);
  },
};

flatpickr('#datetime-picker', options);

function checkTime(selectedDates) {
  if (selectedDates[0] < Date.now()) {
    Notify.failure('Please choose a date in the future', {
      width: '330px',
      position: 'center-top',
      distance: '50px',
      clickToClose: true,
      fontSize: '17px',
    });

    return;
  }
  btnStart.removeAttribute('disabled');
  btnStart.addEventListener(
    'click',
    onBtnStartClick.bind(this, selectedDates[0])
  );
}

let countdown = null;

function onBtnStartClick(selectedDates) {
  timeChange(selectedDates);

  countdown = setInterval(timeChange, 1000, selectedDates);
}

function timeChange(selectedDates) {
  const time = selectedDates - Date.now();

  const { days, hours, minutes, seconds } = convertMs(time);

  if (time < 0) {
    clearInterval(countdown);
    return;
  }

  daysContentRef.textContent = days;
  hoursContentRef.textContent = hours;
  minutesContentRef.textContent = minutes;
  secondsContentRef.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

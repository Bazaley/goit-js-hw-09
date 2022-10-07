const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartClick);

let starting = false;

function onStartClick() {
  if (starting) {
    return;
  }

  addStyleBody();
  const intervalId = setInterval(addStyleBody, 1000);

  starting = true;
  stopBtn.addEventListener('click', onStopClick.bind(this, intervalId));
}

function addStyleBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onStopClick(intervalId) {
  clearInterval(intervalId);
  starting = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

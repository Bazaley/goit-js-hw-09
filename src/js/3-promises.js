import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const amount = e.target.elements.amount.value;
  const step = Number(e.target.elements.step.value);
  let delay = Number(e.target.elements.delay.value);
  let position = 1;

  const intervalId = setInterval(() => {
    if (position >= amount) {
      clearInterval(intervalId);
    }

    createPromise(position, delay).then(onSuccess).catch(onError);

    position += 1;
    delay += step;
  }, step);
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
  console.log(delay);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });
  }, delay);
}

// Вибираємо форму та інпут
const form = document.querySelector('.sign-up-form');
const input = document.querySelector('.footer-input');

// Обробник відправки форми
form.addEventListener('submit', (e) => {
  // Якщо поле порожнє або не відповідає паттерну
  if (!input.value.trim() || !input.checkValidity()) {
    e.preventDefault(); // не відправляти форму
    input.style.borderColor = 'red'; // робимо рамку червоною
  } else {
    input.style.borderColor = '#0B050099'; // повертаємо нормальний колір
  }
});

// Обробник втрати фокусу (blur)
input.addEventListener('blur', () => {
  if (!input.value.trim() || !input.checkValidity()) {
    input.style.borderColor = 'red';
  } else {
    input.style.borderColor = '#0B050099';
  }
});





document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.querySelector('.footer-input');
  const signUpButton = document.querySelector('.footer-button');
  const signUpForm = document.querySelector('.sign-up-form');

  // Перевірка введеного email
  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = new RegExp(emailInput.pattern); // регулярний вираз з HTML
    const isValid = emailPattern.test(emailValue);

    if (isValid) {
      signUpButton.removeAttribute('disabled');
      signUpButton.style.backgroundColor = '#EA8D50'; // встановлюємо колір кнопки активної
    } else {
      signUpButton.setAttribute('disabled', 'true');
      signUpButton.style.backgroundColor = '#ccc'; // сірий колір, коли кнопка не активна
    }
  }

  // Подія на введення тексту в поле email
  emailInput.addEventListener('input', validateEmail);

  // Подія на відправку форми
  signUpForm.addEventListener('submit', function (event) {
    event.preventDefault(); // зупиняє стандартну відправку форми

    // Перевіряємо ще раз, чи правильний email перед відправкою
    if (emailInput.checkValidity()) {
      alert('Thank you for signing up!');
      // Тут можна додати реальну логіку для відправки на сервер
      emailInput.value = ''; // очищаємо поле після відправки
    } else {
      alert('Please enter a valid email address.');
    }
  });

  // Ініціалізація
  validateEmail(); // Перевіряємо email при завантаженні сторінки, щоб кнопка була вимкнена за замовчуванням
});

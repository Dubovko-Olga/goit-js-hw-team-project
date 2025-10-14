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

import { getBookById } from './books/api';
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalImg = document.querySelector('.modal-book-image');
const modalTitle = document.querySelector('.modal-book-title');
const modalAuthor = document.querySelector('.modal-book-author');
const modalPrice = document.querySelector('.modal-book-price');
const modalDesc = document.querySelector('.modal-book-desc');
const addToCart = document.querySelector('.add-to-cart');
const buyNow = document.querySelector('.buy-now');
const countEl = document.querySelector('.count');
const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const Arrow = document.querySelector('.scrollup');

let quantity = 1;
let modalAccordion = null;

// Открытие модалки
function openModal(book) {
  // Сбрасываем количество
  quantity = 1;
  countEl.textContent = quantity;

  // Заполняем данные книги
  modalImg.src = book.book_image;
  modalTitle.textContent = book.title;
  modalAuthor.textContent = `by ${book.author}`;
  modalPrice.textContent = `$${book.price === '0.00' ? '10.00' : book.price}`;
  modalDesc.textContent = book.description || 'No description available.';

  // Открываем модалку
  modalOverlay.classList.remove('hidden');
  Arrow.classList.remove('is-visible');
  document.body.classList.add('modal-open'); // блокировка скролла

  // Инициализация аккордеона (только один раз)
  if (!modalAccordion) {
    modalAccordion = new Accordion(
      modalOverlay.querySelector('.accordion-container'),
      {
        duration: 300,
        openFirst: false,
        multiple: true,
      }
    );
  }
}

// Закрытие модалки
document.addEventListener('keydown', onEscKeyPress);

// === Закрити модалку ===
function closeModal() {
  modalOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  Arrow?.classList.add('is-visible');

  // ✅ Знімаємо слухач клавіатури
  document.removeEventListener('keydown', onEscKeyPress);
}

// === Обробник натискання Escape ===
function onEscKeyPress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

// === Слухачі подій ===
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal(); // ✅ клік по backdrop
});

// Управление количеством
plusBtn.addEventListener('click', () => {
  quantity++;
  countEl.textContent = quantity;
});

minusBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    countEl.textContent = quantity;
  }
});

// Кнопки Learn More
export function addLearnMoreListeners() {
  const buttons = document.querySelectorAll('.learn-more');

  buttons.forEach(btn => {
    btn.addEventListener('click', async e => {
      const bookId = e.currentTarget.dataset.id;
      try {
        const fullBookData = await getBookById(bookId);
        openModal(fullBookData);
      } catch (error) {
        console.error('Error fetching book by ID:', error);
      }
    });
  });
}

addToCart.addEventListener('click', () => {
  iziToast.success({
    message: `You added ${quantity} book${quantity > 1 ? 's' : ''} to cart`,
    position: 'topRight',
  });
});

buyNow.addEventListener('click', () => {
  iziToast.success({
    message: `You bought ${quantity} book${quantity > 1 ? 's' : ''}`,
    position: 'topRight',
  });
});

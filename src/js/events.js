import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  const swiperEl = document.querySelector('.events-swiper');
  if (!swiperEl) return;

  let swiperInstance = null;

  function initSwiper() {
    // якщо ширина екрана < 1280px і свайпер ще не створений
    if (window.innerWidth < 1280 && !swiperInstance) {
      swiperInstance = new Swiper(swiperEl, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 24,

        breakpoints: {
          768: { slidesPerView: 2 },
        },

        pagination: {
          el: '.ev-pagination',
          clickable: true,
          renderBullet: (index, className) =>
            `<li class="${className}" aria-label="Go to slide ${index + 1}"></li>`,
          bulletClass: 'ev-dot',
          bulletActiveClass: 'ev-dot--active',
        },

        navigation: {
          nextEl: '.events-swiper-btn-next',
          prevEl: '.events-swiper-btn-prev',
        },

        watchOverflow: true,
      });
    }

    // якщо ширина екрана ≥ 1280px і свайпер існує — знищуємо його
    else if (window.innerWidth >= 1280 && swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
      swiperEl.querySelectorAll('.swiper-slide').forEach(slide => {
    slide.removeAttribute('style');
  });
    }
  }

  // викликаємо при завантаженні сторінки
  initSwiper();

  // і ще раз при зміні розміру екрана
  window.addEventListener('resize', initSwiper);
});

// =================== modal open ===================

// Отримуємо бекдроп
const backdrop = document.getElementById('modal-backdrop');

// Функція відкриття модалки
function openModal(eventTitle) {
  // Створюємо HTML модалки (якщо ще немає)
  let modal = document.querySelector('.modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.classList.add('modal');

    // Кнопка закриття
    modal.innerHTML = `
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <h2 class="modal-title">Register for Event</h2>
            <p class="event-title">${eventTitle}</p>
            <form class="modal-form">
                <label>
                    Name
                    <input type="text" placeholder="Your name" required>
                </label>
                <label>
                    Email
                    <input type="email" placeholder="Your email" required>
                </label>
                <button type="submit">Submit</button>
            </form>
        `;
    backdrop.appendChild(modal);

    // Закриття по кнопці
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
  } else {
    // Якщо модалка вже є, просто оновлюємо заголовок події
    modal.querySelector('.event-title').textContent = eventTitle;
  }

  // Показуємо бекдроп
  backdrop.classList.add('is-open');
  document.body.classList.add('no-scroll');

  // Закриття по кліку на бекдроп поза модалкою
  backdrop.addEventListener('click', function handler(e) {
    if (e.target === backdrop) closeModal();
    backdrop.removeEventListener('click', handler);
  });
}

// Функція закриття
function closeModal() {
  backdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

// Прив'язуємо кнопки
const registerButtons = document.querySelectorAll('.event-register-btn');
registerButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const eventTitle = btn.dataset.event;
    openModal(eventTitle);
  });
});

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  const swiperEl = document.querySelector('.events-swiper');
  const prevBtn = document.querySelector('.events-swiper-btn-prev');
  const nextBtn = document.querySelector('.events-swiper-btn-next');

  if (!swiperEl) return;

  let swiperInstance = null;

  function updateNavigationState(swiper) {
    if (!swiper) return;

    // Якщо на першому слайді – блокуємо Prev
    if (swiper.isBeginning) {
      prevBtn.disabled = true;
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.disabled = false;
      prevBtn.classList.remove('disabled');
    }

    // Якщо на останньому слайді – блокуємо Next
    if (swiper.isEnd) {
      nextBtn.disabled = true;
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.disabled = false;
      nextBtn.classList.remove('disabled');
    }
  }

  function initSwiper() {
    if (window.innerWidth < 1440 && !swiperInstance) {
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
            `<li class="${className}" aria-label="Go to slide ${
              index + 1
            }"></li>`,
          bulletClass: 'ev-dot',
          bulletActiveClass: 'ev-dot--active',
        },

        navigation: {
          nextEl: '.events-swiper-btn-next',
          prevEl: '.events-swiper-btn-prev',
        },

        watchOverflow: true,

        on: {
          init() {
            updateNavigationState(this);
          },
          slideChange() {
            updateNavigationState(this);
          },
        },
      });
    }

    // Якщо >=1440px – знищити Swiper і кнопки зробити неактивними
    else if (window.innerWidth >= 1440 && swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;

      // Очистка стилів
      swiperEl.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.removeAttribute('style');
      });

      // Вимкнення кнопок
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      prevBtn.classList.add('disabled');
      nextBtn.classList.add('disabled');
    }
  }

  // Викликаємо при завантаженні
  initSwiper();

  // Викликаємо при зміні розміру екрана
  window.addEventListener('resize', initSwiper);
});

// feedbacks.js
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper } from 'swiper';
import { Navigation, Pagination, A11y, Keyboard } from 'swiper/modules';

function setDisabled(btn, disabled) {
  if (!btn) return;
  btn.classList.toggle('is-disabled', disabled);
  btn.disabled = disabled;
  btn.setAttribute('aria-disabled', String(disabled));
  btn.tabIndex = disabled ? -1 : 0;
}

function updateNav(swiper, prev, next) {
  setDisabled(prev, swiper.isBeginning);
  setDisabled(next, swiper.isEnd);
}

export function initFeedbacks() {
  const root = document.querySelector('.feedbacks__swiper');
  if (!root) return;

  const section = root.closest('.feedbacks');
  const prevBtn = section.querySelector('.feedbacks__btn--prev');
  const nextBtn = section.querySelector('.feedbacks__btn--next');
  const paginationEl = section.querySelector('.feedbacks__pagination');

  const swiper = new Swiper(root, {
    modules: [Navigation, Pagination, A11y, Keyboard],

    speed: 450,
    spaceBetween: 24,
    slidesPerView: 1,
    slidesPerGroup: 1,
    autoHeight: true,

    observer: true,
    observeParents: true,
    observeSlideChildren: true,


    breakpoints: {
      768:  { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 24 },
      1440: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
    },


    pagination: {
      el: paginationEl,
      clickable: true,
      bulletElement: 'button',
      renderBullet: (i, className) =>
        `<button type="button" class="${className}" aria-label="Go to slide ${i + 1}"></button>`,
    },


    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
      disabledClass: 'is-disabled',
    },

    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true },

    on: {
      afterInit(s) { updateNav(s, prevBtn, nextBtn); },
      slideChange(s) { updateNav(s, prevBtn, nextBtn); },
      resize(s) {
        s.updateAutoHeight(200);
        updateNav(s, prevBtn, nextBtn);
      },
    },
  });

  queueMicrotask(() => swiper.update());
  window.addEventListener('load', () => swiper.update());

  return swiper;
}

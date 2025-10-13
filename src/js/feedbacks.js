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

  const sw = new Swiper(root, {
    modules: [Navigation, Pagination, A11y, Keyboard],

    observer: true,
    observeParents: true,
    observeSlideChildren: true,

    speed: 450,
    spaceBetween: 24,

    breakpointsBase: 'window',
    slidesPerView: 1,
    slidesPerGroup: 1,

    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
      },
    },

    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
      disabledClass: 'is-disabled',
    },

    pagination: {
      el: paginationEl,
      clickable: true,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    a11y: {
      enabled: true,
      slideRole: 'listitem',
    },

    on: {
      init(s) {
        updateNav(s, prevBtn, nextBtn);
      },
      slideChange(s) {
        updateNav(s, prevBtn, nextBtn);
      },
      resize(s) {
        updateNav(s, prevBtn, nextBtn);
      },
      reachBeginning(s) {
        updateNav(s, prevBtn, nextBtn);
      },
      reachEnd(s) {
        updateNav(s, prevBtn, nextBtn);
      },
    },
  });


  setTimeout(() => sw.update(), 0);
  window.addEventListener('load', () => sw.update());
}

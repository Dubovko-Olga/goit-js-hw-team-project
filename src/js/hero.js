export function initHeroSlider() {
  const swiperWrapper = document.querySelector('.hero-swiper-wrapper');
  const slides = document.querySelectorAll('.hero-swiper-slide');
  const prevBtn = document.querySelector('.hero-btn-left');
  const nextBtn = document.querySelector('.hero-btn-right');

  let currentSlide = 0;

  // Оновлює стан кнопок "Previous" та "Next"
  const updateButtons = () => {
    if (currentSlide === 0) {
      prevBtn.classList.add('disabled');
      prevBtn.setAttribute('aria-disabled', 'true');
    } else {
      prevBtn.classList.remove('disabled');
      prevBtn.removeAttribute('aria-disabled');
    }

    if (currentSlide === slides.length - 1) {
      nextBtn.classList.add('disabled');
      nextBtn.setAttribute('aria-disabled', 'true');
    } else {
      nextBtn.classList.remove('disabled');
      nextBtn.removeAttribute('aria-disabled');
    }
  };

  // Функція для переміщення слайдера
  const moveSlider = () => {
    const slideWidth = slides[0].offsetWidth;
    swiperWrapper.style.transform = `translateX(-${
      slideWidth * currentSlide
    }px)`;
    updateButtons();
  };

  // Обробник події для кнопки "Previous"
  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      moveSlider();
    }
  });

  // Обробник події для кнопки "Next"
  nextBtn.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      moveSlider();
    }
  });

  // Обробка події зміни розміру
  window.addEventListener('resize', () => {
    moveSlider();
  });

  // Ініціалізація слайдера
  moveSlider();
}


export function initHeroSlider() {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const slides = document.querySelectorAll('.swiper-slide');
  const prevBtn = document.querySelector('.hero-btn-left');
  const nextBtn = document.querySelector('.hero-btn-right');

  if (!swiperWrapper || slides.length === 0 || !prevBtn || !nextBtn) {
    console.warn('Hero slider: не знайдено потрібні елементи.');
    return;
  }

  let currentSlide = 0;
  const totalSlides = slides.length;

  const getSlideWidth = () => slides[0].offsetWidth;

  function updateButtons() {
    prevBtn.classList.toggle('disabled', currentSlide === 0);
    nextBtn.classList.toggle('disabled', currentSlide === totalSlides - 1);
  }

  function moveSlider() {
    const slideWidth = getSlideWidth();
    swiperWrapper.style.transform = `translateX(-${
      slideWidth * currentSlide
    }px)`;
    updateButtons();
  }

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      moveSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      moveSlider();
    }
  });

  window.addEventListener('resize', moveSlider);

  // Запуск слайдера
  moveSlider();
}


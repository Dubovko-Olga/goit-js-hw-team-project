document.addEventListener('DOMContentLoaded', function () {
  const swiperWrapper = document.querySelector('.hero-swiper-wrapper');
  const slides = document.querySelectorAll('.hero-swiper-slide');
  const prevBtn = document.querySelector('.hero-btn-left');
  const nextBtn = document.querySelector('.hero-btn-right');

  let currentSlide = 0;

  function updateButtons() {
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
  }

  function moveSlider() {
    const slideWidth = slides[0].offsetWidth;
    swiperWrapper.style.transform = `translateX(-${
      slideWidth * currentSlide
    }px)`;
    updateButtons();
  }

  prevBtn.addEventListener('click', function () {
    if (currentSlide > 0) {
      currentSlide--;
      moveSlider();
    }
  });

  nextBtn.addEventListener('click', function () {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      moveSlider();
    }
  });

  window.addEventListener('resize', moveSlider);

  moveSlider();
});

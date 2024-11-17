(function () {
  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const indicatorItems = container.querySelectorAll('.indicator');
  const pauseBtn = container.querySelector('#pause-btn');
  const prevBtn = container.querySelector('#prev-btn');
  const nextBtn = container.querySelector('#next-btn');

  const INTERVAL = 1000;
  let currentSlide = 0;
  let isPlaying = true;
  let timerId = null;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    indicatorItems[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    indicatorItems[currentSlide].classList.add('active');
  }

  function goToPrevSlide() {
    goToSlide(currentSlide - 1);
  }

  function goToNextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoPlay() {
    timerId = setInterval(goToNextSlide, INTERVAL);
  }

  function stopAutoPlay() {
    isPlaying = true;
    clearInterval(timerId);
    changContentBtn();
  }

  function changContentBtn()
  {
    if (isPlaying) {
      pauseBtn.textContent = 'Play';
    } else {
      pauseBtn.textContent = 'Pause';
    }
  }

  function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
    changContentBtn();
  }

  function prevSlideHandler() {
    stopAutoPlay();
    goToPrevSlide();
  }

  function nextSlideHandler() {
    stopAutoPlay();
    goToNextSlide();
  }

  function indicatorClickHandler(event) {
    const target = event.target;
    if (target.classList.contains('indicator')) {
      stopAutoPlay();
      goToSlide(Number(target.dataset.slideTo));
    }
  }

  function swipeStartHandler(e) {
    startPosX =
      e instanceof MouseEvent
        ? e.pageX
        : e.changedTouches[0].pageX;
   }

   function swipeEndHandler(e) {
    endPosX =
      e instanceof MouseEvent
        ? e.pageX
        : e.changedTouches[0].pageX;

    if (endPosX - startPosX > 100) prevSlideHandler();
    if (endPosX - startPosX < -100) nextSlideHandler();
   }

  function initEventListeners() {
    pauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevSlideHandler);
    nextBtn.addEventListener('click', nextSlideHandler);
    indicatorsContainer.addEventListener('click', indicatorClickHandler);
    container.addEventListener('touchstart', swipeStartHandler);
    container.addEventListener('mousedown', swipeStartHandler);
    container.addEventListener('touchend', swipeEndHandler);
    container.addEventListener('mouseup', swipeEndHandler);
  }

  function init() {
    initEventListeners();
    startAutoPlay();
  }
  
  init();
}());
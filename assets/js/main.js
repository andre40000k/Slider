class Carousel {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector)
    this.slides = this.container.querySelectorAll('.slide')
    this.indicatorsContainer = this.container.querySelector('#indicators-container')
    this.indicatorItems = this.container.querySelectorAll('.indicator')
    this.pauseBtn = this.container.querySelector('#pause-btn')
    this.prevBtn = this.container.querySelector('#prev-btn')
    this.nextBtn = this.container.querySelector('#next-btn')

    this.INTERVAL = 1000
    this.currentSlide = 0
    this.isPlaying = true
    this.timerId = null

    this.init()
  }

  goToSlide(n) {
    this.slides[this.currentSlide].classList.remove('active')
    this.indicatorItems[this.currentSlide].classList.remove('active')
    this.currentSlide = (n + this.slides.length) % this.slides.length
    this.slides[this.currentSlide].classList.add('active')
    this.indicatorItems[this.currentSlide].classList.add('active')
  }

  goToPrevSlide() {
    this.goToSlide(this.currentSlide - 1)
  }

  goToNextSlide() {
    this.goToSlide(this.currentSlide + 1)
  }

  startAutoPlay() {
    this.timerId = setInterval(() => this.goToNextSlide(), this.INTERVAL)
  }

  stopAutoPlay() {
    clearInterval(this.timerId)
    this.isPlaying = true
    this.changeContentBtn()
  }

  changeContentBtn() {
    this.pauseBtn.textContent = this.isPlaying ? 'Play' : 'Pause'
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying
    if (this.isPlaying) {
      this.stopAutoPlay()
    } else {
      this.startAutoPlay()
    }
    this.changeContentBtn()
  }

  prevSlideHandler() {
    this.stopAutoPlay()
    this.goToPrevSlide()
  }

  nextSlideHandler() {
    this.stopAutoPlay()
    this.goToNextSlide()
  }

  indicatorClickHandler(event) {
    const target = event.target
    if (target.classList.contains('indicator')) {
      this.stopAutoPlay()
      this.goToSlide(Number(target.dataset.slideTo))
    }
  }

  swipeStartHandler(event) {
    this.startPosX = event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX
  }

  swipeEndHandler(event) {
    this.endPosX = event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX

    if (this.endPosX - this.startPosX > 100) this.prevSlideHandler()
    if (this.endPosX - this.startPosX < -100) this.nextSlideHandler()
  }

  initEventListeners() {
    this.pauseBtn.addEventListener('click', () => this.togglePlayPause())
    this.prevBtn.addEventListener('click', () => this.prevSlideHandler())
    this.nextBtn.addEventListener('click', () => this.nextSlideHandler())
    this.indicatorsContainer.addEventListener('click', (event) => this.indicatorClickHandler(event))

    this.container.addEventListener('touchstart', (event) => this.swipeStartHandler(event))
    this.container.addEventListener('mousedown', (event) => this.swipeStartHandler(event))
    this.container.addEventListener('touchend', (event) => this.swipeEndHandler(event))
    this.container.addEventListener('mouseup', (event) => this.swipeEndHandler(event))
  }

  init() {
    this.initEventListeners()
    this.startAutoPlay()
  }
}

new Carousel('#carousel')

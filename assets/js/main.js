function Carousel(containerSelector) {
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

Carousel.prototype.goToSlide = function (n) {
  this.slides[this.currentSlide].classList.remove('active')
  this.indicatorItems[this.currentSlide].classList.remove('active')
  this.currentSlide = (n + this.slides.length) % this.slides.length
  this.slides[this.currentSlide].classList.add('active')
  this.indicatorItems[this.currentSlide].classList.add('active')
}

Carousel.prototype.goToPrevSlide = function () {
  this.goToSlide(this.currentSlide - 1)
}

Carousel.prototype.goToNextSlide = function () {
  this.goToSlide(this.currentSlide + 1)
}

Carousel.prototype.startAutoPlay = function () {
  this.timerId = setInterval(this.goToNextSlide.bind(this), this.INTERVAL)
}

Carousel.prototype.stopAutoPlay = function () {
  clearInterval(this.timerId)
  this.isPlaying = true
  this.changeContentBtn()
}

Carousel.prototype.changeContentBtn = function () {
  this.pauseBtn.textContent = this.isPlaying ? 'Play' : 'Pause'
}

Carousel.prototype.togglePlayPause = function () {
  this.isPlaying = !this.isPlaying
  if (this.isPlaying) {
    this.stopAutoPlay()
  } else {
    this.startAutoPlay()
  }
  this.changeContentBtn()
}

Carousel.prototype.prevSlideHandler = function () {
  this.stopAutoPlay()
  this.goToPrevSlide()
}

Carousel.prototype.nextSlideHandler = function () {
  this.stopAutoPlay()
  this.goToNextSlide()
}

Carousel.prototype.indicatorClickHandler = function (event) {
  const target = event.target
  if (target.classList.contains('indicator')) {
    this.stopAutoPlay()
    this.goToSlide(Number(target.dataset.slideTo))
  }
}

Carousel.prototype.swipeStartHandler = function (event) {
  this.startPosX = event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX
}

Carousel.prototype.swipeEndHandler = function (event) {
  this.endPosX = event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX

  if (this.endPosX - this.startPosX > 100) this.prevSlideHandler();
  if (this.endPosX - this.startPosX < -100) this.nextSlideHandler();
}

Carousel.prototype.initEventListeners = function () {
  this.pauseBtn.addEventListener('click', this.togglePlayPause.bind(this))
  this.prevBtn.addEventListener('click', this.prevSlideHandler.bind(this))
  this.nextBtn.addEventListener('click', this.nextSlideHandler.bind(this))
  this.indicatorsContainer.addEventListener('click', this.indicatorClickHandler.bind(this))
  this.container.addEventListener('touchstart', this.swipeStartHandler.bind(this))
  this.container.addEventListener('mousedown', this.swipeStartHandler.bind(this))
  this.container.addEventListener('touchend', this.swipeEndHandler.bind(this))
  this.container.addEventListener('mouseup', this.swipeEndHandler.bind(this))
}

Carousel.prototype.init = function () {
  this.initEventListeners()
  this.startAutoPlay()
}

new Carousel('#carousel')

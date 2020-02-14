class Diaporama {
	constructor(id, duration = 5000) {
		this.$el = document.getElementById(id);
		this.$slides = this.$el.querySelectorAll('.slides .item');
		this.$controls = this.$el.querySelector('.controls');
		this.$timer = this.$el.querySelector('.timer');

		this.duration = duration;
		this.count = this.$slides.length;
		this.current = 0;

		this.getCurrentFromClass();
		this.startTimer();
		this.bindControls();
	}

	getCurrentFromClass() {
		this.$slides.forEach((item, index) => {
			if (item.classList.contains('active')) {
				this.current = index;
			}
		});
	}

	startTimer() {
		clearTimeout(this.timer);

		this.timer = setTimeout(() => {
			this.$timer.querySelector('span').style.width = 0;
			this.nextSlide();
		}, this.duration);

		this.startElapsed();
	}

	startElapsed() {
		let elapsed = 0;
		let timerElement = this.$timer.querySelector('span');
		clearInterval(this.progression);

		this.progression = setInterval(() => {
			elapsed += this.duration / 1000;
			let width = 100 * elapsed / this.duration;
			timerElement.style.width = width + '%';
		}, this.duration / 1000);
	}

	nextSlide() {
		let nextIndex = this.getNextIndex();
		let currentSlide = this.$slides[this.current];
		let nextSlide = this.$slides[this.getNextIndex()];

		this.current = nextIndex;
		this.changeSlide(currentSlide, nextSlide);
	}

	previousSlide() {
		let previousIndex = this.getPreviousIndex();
		let currentSlide = this.$slides[this.current];
		let previousSlide = this.$slides[previousIndex];

		this.current = previousIndex;
		this.changeSlide(currentSlide, previousSlide);
	}

	changeSlide(current, next) {
		current.classList.remove('active');
		next.classList.add('active');

		this.getCurrentFromClass();
		this.startTimer();
	}

	getNextIndex() {
		let nextIndex = this.current + 1;
		let lastIndex = this.count - 1;

		if (nextIndex > lastIndex) {
			return 0;
		}

		return nextIndex;
	}

	getPreviousIndex() {
		let prevIndex = this.current - 1;
		let lastIndex = this.count - 1;

		if (prevIndex < 0) {
			return lastIndex;
		}

		return prevIndex;
	}

	bindControls() {
		this.$controls.querySelector('.left').addEventListener('click', (event) => {
			event.preventDefault();
			this.previousSlide();
		});

		this.$controls.querySelector('.right').addEventListener('click', (event) => {
			event.preventDefault();
			this.nextSlide();
		});
	}
}

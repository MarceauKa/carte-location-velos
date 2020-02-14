class Signature {
	constructor(element, lineWidth = 5) {
		this.$el = element;
		this.lineWidth = lineWidth;
		this.fixOffset = 10;
	}

	init() {
		this.context = this.$el.getContext('2d');
		this.context.lineJoin = this.context.lineCap = 'round';
		this.points = [];
		this.drawing = false;

		let element = $(this.$el);
		element.attr('width', element.width());
		element.attr('height', element.height());

		let rectangle = this.$el.getBoundingClientRect();
		this.offset = {
			x: rectangle.left - this.fixOffset,
			y: rectangle.top - this.fixOffset,
		};

		this.bindEvents();
	}

	bindEvents() {
		$(this.$el)
			.on('touchstart mousedown', (event) => {
				let position = this.getMousePosition(event);

				this.drawing = true;
				this.points.push({x: position.x, y: position.y, break: false});

				return false;
			})
			.on('touchmove mousemove', (event) => {
				if (this.drawing) {
					let position = this.getMousePosition(event);
					this.draw(position.x, position.y);
				}

				return false;
			})
			.on('touchend mouseup', (event) => {
				event.preventDefault();

				this.drawing = false;
				this.points[this.points.length - 1].break = true;

				return false;
			});
	}

	touch(event) {
		let touch = event;

		if (event.type !== 'click' && event.type !== 'mousedown' && event.type !== 'mousemove') {
			touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		}

		return {
			x: touch.pageX,
			y: touch.pageY
		};
	}

	getMousePosition(event) {
		let position = this.touch(event);

		return {
			x: position.x - this.offset.x,
			y: position.y - this.offset.y
		};
	}

	draw(x, y) {
		this.points.push({
			x: x,
			y: y,
			break: false
		});

		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		let firstPoint = this.points[0];
		let secondPoint = this.points[1];

		this.context.beginPath();
		this.context.moveTo(firstPoint.x, firstPoint.y);

		for (let i = 1; i < this.points.length; i++) {
			let middlePoint = this.calculateIntermediate(firstPoint, secondPoint);

			if (firstPoint.break) {
				this.context.moveTo(secondPoint.x, secondPoint.y);
			} else {
				this.context.quadraticCurveTo(firstPoint.x, firstPoint.y, middlePoint.x, middlePoint.y);
			}

			firstPoint = this.points[i];
			secondPoint = this.points[i + 1];
		}

		this.context.lineWidth = this.lineWidth;
		this.context.lineTo(firstPoint.x, firstPoint.y);
		this.context.stroke();
	}

	calculateIntermediate(firstPoint, secondPoint) {
		return {
			x: firstPoint.x + (secondPoint.x - firstPoint.x) / 2,
			y: firstPoint.y + (secondPoint.y - firstPoint.y) / 2
		}
	}

	reset() {
		this.context.clearRect(0, 0, this.$el.width, this.$el.height);
		this.points = [];
	}
}
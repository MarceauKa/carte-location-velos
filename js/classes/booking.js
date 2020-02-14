/**
 * @author Marceau Ka <marceau@casals.fr>
 * @licence MIT
 */
class Booking {
	constructor(id) {
		this.$el = document.getElementById(id);

		this.hide();
		this.getSession();
	}

	hide() {
		this.$el.style.display = 'none';
	}

	show() {
		this.$el.style.display = 'block';
	}

	showInfos() {
		this.$el.querySelector('.station-name').textContent = this.booking.name;
		this.show();
	}

	expiration() {
		let element = this.$el.querySelector('.station-expire');
		let end_at = this.booking.end_at;

		this.timer = setInterval(() => {
			let now = Math.round((new Date()).getTime() / 1000);

			if (end_at < now) {
				this.clear();
			} else {
				let diffInSeconds = end_at - now;
				let minutesLeft = Math.round(diffInSeconds / 60);
				let secondsLeft = diffInSeconds % 60;
				element.textContent = `${minutesLeft} minutes et ${Math.round(secondsLeft)} secondes`;
			}
		}, 1000);
	}

	clear() {
		clearInterval(this.timer);
		window.sessionStorage.removeItem('booking');
		this.hide();
	}

	getSession() {
		let booking = window.sessionStorage.getItem('booking');
		this.booking = null;

		if (booking) {
			this.booking = JSON.parse(booking);
			this.showInfos();
			this.expiration();
		}
	}
}
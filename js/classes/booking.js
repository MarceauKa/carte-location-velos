class Booking {
	constructor(element) {
		this.$el = element;

		this.getSession();
	}

	getSession() {
		let booking = window.sessionStorage.getItem('booking');
		this.booking = null;

		if (booking) {
			this.booking = JSON.parse(booking);
		}
	}
}
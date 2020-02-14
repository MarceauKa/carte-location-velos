class Booking {
	constructor(id) {
		this.$el = document.getElementById(id);

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
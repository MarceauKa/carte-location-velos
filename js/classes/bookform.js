class Bookform {
	constructor(element) {
		this.$el = element;
		this.$message = $('.message', this.$el);
		this.$form = $('.form', this.$el);

		this.reset();
		this.bindEvents();
	}

	reset() {
		this.station = null;
		this.$message.show();
		this.$form.hide();
	}

	select(station) {
		this.station = station;
		this.$message.hide();
		this.$form.show();

		this.nameFromLocalStorage();
		this.parseStation();
	}

	parseStation() {
		$('.station-name', this.$form).text(this.station.name);
		$('.station-address', this.$form).text(this.station.address);
		$('.station-available', this.$form).text(this.station.totalStands.availabilities.bikes);
		$('.station-total', this.$form).text(this.station.totalStands.capacity);

		signature.init();
	}

	nameToLocalStorage() {
		let firstname = $('input[name="firstname"]', this.$form).val();
		let lastname = $('input[name="lastname"]', this.$form).val();

		window.localStorage.setItem('user', JSON.stringify({
			firstname: firstname,
			lastname: lastname,
		}))
	}

	nameFromLocalStorage() {
		let user = window.localStorage.getItem('user') || null;

		if (user) {
			user = JSON.parse(user);

			if (user.firstname && user.lastname) {
				$('input[name="firstname"]', this.$form).val(user.firstname);
				$('input[name="lastname"]', this.$form).val(user.lastname);
			}
		}
	}

	save() {
		let booking = {
			station: this.station.number,
			end_at: Math.round((new Date()).getTime() / 1000) + 20 * 60,
		};

		window.sessionStorage.setItem('booking', JSON.stringify(booking));
	}

	bindEvents() {
		this.$form.on('submit', (event) => {
			event.preventDefault();

			if (false === signature.isNotEmpty()) {
				alert("N'oubliez pas de signer pour valider la réservation.");
			}

			this.nameToLocalStorage();
			this.save();
		});
	}
}
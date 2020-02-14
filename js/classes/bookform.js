/**
 * @author Marceau Ka <marceau@casals.fr>
 * @licence MIT
 */
class Bookform {
	constructor(id) {
		this.$el = document.getElementById(id);
		this.$message = this.$el.querySelector('.message');
		this.$form = this.$el.querySelector('.form');

		this.reset();
		this.bindEvents();
	}

	reset() {
		this.station = null;
		this.$message.style.display = 'block';
		this.$form.style.display = 'none';
	}

	select(station) {
		this.station = station;
		this.$message.style.display = 'none';
		this.$form.style.display = 'block';

		this.nameFromLocalStorage();
		this.parseStation();
	}

	parseStation() {
		this.$form.querySelector('.station-name').textContent = this.station.name;
		this.$form.querySelector('.station-address').textContent = this.station.address;
		this.$form.querySelector('.station-available').textContent = this.station.totalStands.availabilities.bikes;
		this.$form.querySelector('.station-total').textContent = this.station.totalStands.capacity;

		signature.init();
	}

	nameToLocalStorage() {
		let firstname = this.$form.querySelector('input[name="firstname"]').value;
		let lastname = this.$form.querySelector('input[name="lastname"]').value;

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
				this.$form.querySelector('input[name="firstname"]').value = user.firstname;
				this.$form.querySelector('input[name="lastname"]').value = user.lastname;
			}
		}
	}

	save() {
		let booking = {
			number: this.station.number,
			name: this.station.name,
			end_at: Math.round((new Date()).getTime() / 1000) + 20 * 60,
		};

		window.sessionStorage.setItem('booking', JSON.stringify(booking));
	}

	bindEvents() {
		this.$form.addEventListener('submit', (event) => {
			event.preventDefault();

			if (false === signature.isNotEmpty()) {
				alert("N'oubliez pas de signer pour valider la réservation.");
			}

			this.nameToLocalStorage();
			this.save();

			alert("Votre réservation a été sauvegardée !");
			this.reset();
			booking.getSession();
		});
	}
}
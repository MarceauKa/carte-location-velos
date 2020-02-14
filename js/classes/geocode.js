class Geocode {
	constructor() {
		if (!navigator.geolocation) {
			console.log("Geolocation non supportée");
		}
	}

	findPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => this.onSuccess(position, resolve),
				(error) => this.onError(error, reject)
			);
		});
	}

	onSuccess(position, callback) {
		this.latitude  = position.coords.latitude;
		this.longitude = position.coords.longitude;

		callback({'latitude': this.latitude, 'longitude': this.longitude});
	}

	onError(error, callback) {
		callback(error);
	}
}
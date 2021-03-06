/**
 * @author Marceau Ka <marceau@casals.fr>
 * @licence MIT
 */
class DataSource {
	#apiKey = 'c8521ea47c80b391ef417c496a6b76b01cec6fb5';
	#contractName = 'toulouse';
	#urlStations = 'https://api.jcdecaux.com/vls/v3/stations'; // https://api.jcdecaux.com/vls/v3/stations?apiKey={apiKey}
	#urlStation = 'https://api.jcdecaux.com/vls/v3/stations/'; // https://api.jcdecaux.com/vls/v3/stations/{station}?contract={contractName}&apiKey={apiKey}

	findMarkers() {
		return new Promise((resolve, reject) => {
			let request = new Request(this.getApiStations());

			fetch(request)
				.then((response) => {
					resolve(response.json());
				}).catch((error) => {
					reject(error);
				});
		})
	}

	getApiStations() {
		return `${this.#urlStations}?contract=${this.#contractName}&apiKey=${this.#apiKey}`;
	}

	getApiStation(station) {
		return `${this.#urlStation}${station.number}?contract=${station.contract}&apiKey=${this.#apiKey}`;
	}
}
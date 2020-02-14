class Map {
    constructor(id) {
        this.map = L.map(id);
        this.geo = new Geocode();
        this.source = new DataSource();
        this.markers = [];

        // Défini le fond de carte sur Open Street Map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(this.map);

        // Centre la map sur Toulouse
        this.locate();

        // Place les stations depuis la source API
        this.watchMarkers();

        // Les marqueurs sont rafraîchis toutes les minutes
        setInterval(() => {
			this.watchMarkers();
		}, 60000);
    }

    locate() {
    	// Par défaut : Toulouse
		this.map.setView([43.6046, 1.4451], 15);

		/*this.geo
            .findPosition()
            .then((position) => {
                this.map.setView([position.latitude, position.longitude], 16);
            })
            .catch((error) => {
                alert("Vous devez accepter le partage de votre position pour continuer.");
            });*/
	}

    watchMarkers() {
		this.source
			.findMarkers()
			.then((markers) => {
				this.clearMarkers();

				markers.forEach((marker) => {
					if (marker.status === 'OPEN') {
						let item = L.marker([marker.position.latitude, marker.position.longitude], {
							title: marker.name,
							riseOnHover: true,
							marker: marker,
						})
							.addTo(this.map);

						item.on('click', (item) => {
							book.select(item.target.options.marker);
						});

						this.markers.push(item);
					}
				});
			});
	}

	clearMarkers() {
    	this.markers.forEach((marker) => {
    		this.map.removeLayer(marker);
		});

		this.markers = [];
	}
}
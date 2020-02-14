class Bookform {
	constructor(element) {
		this.$el = element;
		this.$message = $('.message', this.$el);
		this.$form = $('.form', this.$el);

		this.reset();
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

		this.parseStation();
	}

	parseStation() {
		$('.station-name', this.$form).text(this.station.name);
		$('.station-address', this.$form).text(this.station.address);
		$('.station-available', this.$form).text(this.station.totalStands.availabilities.bikes);
		$('.station-total', this.$form).text(this.station.totalStands.capacity);

		signature.init();
	}
}
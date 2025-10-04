const cron = require("node-cron");
const { BookingService } = require("../../services");

function scheduleCron() {
	cron.schedule("*/30 * * * * ", async () => {
		// console.log(BookingService);
		await BookingService.cancelOldBooking();
		// console.log(response);
	});
}

module.exports = scheduleCron;

const express = require("express");

const { InfoController } = require("../../controllers");
const bookingRoute = require("./booking-route");

const router = express.Router();

router.get("/info", InfoController.info);
router.use("/booking", bookingRoute);

module.exports = router;

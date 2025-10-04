const express = require("express");

const v1Routes = require("./v1");

const router = express.Router();
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Flight Booking Service",
    });
});
router.use("/v1", v1Routes);

module.exports = router;

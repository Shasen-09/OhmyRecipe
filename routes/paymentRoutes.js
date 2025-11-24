const express = require("express");
const router = express.Router();

const {
  initiateKhaltiPayment, verifyKhaltiPayment
} = require("../controller/paymentController");

router.post("/initiate", initiateKhaltiPayment);

router.post("/khalti/verify", verifyKhaltiPayment);

module.exports = router;

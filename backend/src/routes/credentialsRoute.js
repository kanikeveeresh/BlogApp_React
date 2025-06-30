const express = require("express");
const router = express.Router();
const credentialsController = require("../controllers/credentialsController");

router.post("/signup", credentialsController.register);

router.post("/login", credentialsController.login);

module.exports = router;

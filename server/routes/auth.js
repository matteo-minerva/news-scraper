const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @method POST
 * @access public
 * @endpoint /api/auth/
 **/
router.post("/", authController.login);

module.exports = router;

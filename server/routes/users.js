const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

/**
 * @method POST
 * @access private
 * @endpoint /api/users/
 **/
router.post("/", userController.create);

/**
 * @method GET
 * @access private
 * @endpoint /api/users/me
 **/
router.get("/me", auth, userController.getCurrentUser);

module.exports = router;

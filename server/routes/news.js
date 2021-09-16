const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");

/**
 * @method GET
 * @access public
 * @endpoint /api/news/
 **/
router.get("/", newsController.read);

/**
 * @method POST
 * @access private
 * @endpoint /api/news/
 **/
router.post("/", newsController.create);

/**
 * @method GET
 * @access public
 * @endpoint /api/news/:id
 **/
router.get("/:id", newsController.findById);

module.exports = router;

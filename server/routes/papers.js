const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const paperController = require("../controllers/paper.controller");
const admin = require("../middleware/admin");

/**
 * @method GET
 * @access public
 * @endpoint /api/papers/
 **/
router.get("/", paperController.read);

/**
 * @method POST
 * @access private
 * @endpoint /api/papers/
 **/
router.post("/", [auth, admin], paperController.create);

/**
 * @method PUT
 * @access private
 * @endpoint /api/papers/6cad859d-d3d9-488d-8dc1-9238c780e4a4
 **/
router.put("/:id", [auth, admin], paperController.update);

/**
 * @method DELETE
 * @access private
 * @endpoint /api/papers/6cad859d-d3d9-488d-8dc1-9238c780e4a4
 **/
router.delete("/:id", [auth, admin], paperController.delete);

/**
 * @method GET
 * @access public
 * @endpoint /api/papers/6cad859d-d3d9-488d-8dc1-9238c780e4a4
 **/
router.get("/:id", paperController.findById);

module.exports = router;

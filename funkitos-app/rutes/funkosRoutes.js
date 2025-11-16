// routes/funkosRoutes.js
const express = require("express");
const router = express.Router();
const {
  getFunkos,
  getFunkoById,
} = require("../controles/apiFunkos");

router.get("/", getFunkos);
router.get("/:id", getFunkoById);

module.exports = router;


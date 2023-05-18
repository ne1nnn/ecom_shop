const express = require("express");
const router = express.Router();
const { getAllCategory } = require("../controllers/controller.category");


router.get("/category", getAllCategory ); 


module.exports = router;

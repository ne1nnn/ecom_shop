const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Ruta para obtener la imagen
router.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../helpers/uploads", filename);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("No se encontró la imagen");
  }
});

module.exports = router;

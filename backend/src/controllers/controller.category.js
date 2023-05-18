const Product = require("../models/model.product");

async function getAllCategory(req, res) {
  try {
    const category = req.params.category;

    const productos = await Product.find({ category: category });

    res.json(productos);
  } catch (err) {
    // Manejar el error
    console.error(err);
    res.status(500).json({ error: "Error al obtener los productos por categoría" });
  }
}

module.exports = {
    getAllCategory
}
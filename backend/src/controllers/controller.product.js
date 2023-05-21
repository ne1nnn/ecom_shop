const Product = require("../models/model.product");

// Controlador para la ruta GET /products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Controlador para la ruta GET /products/:id
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Controlador para la ruta POST /products
async function createProduct(req, res) {
  try {
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      image: req.file.filename,
      description: req.body.description,
      quantity: req.body.quantity,
      category: req.body.category,
    });
    await product.save();
    console.log(product);
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Controlador para la ruta PUT /products/:id
async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Controlador para la ruta DELETE /products/:id
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

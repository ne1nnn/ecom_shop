const express = require("express");
const cors = require("cors");
const db = require("./db");
const productRoutes = require("./src/routes/product.routes");
const imageRoutes = require("./src/routes/images.routes");
const categoryRoutes = require("./src/routes/category.routes")
const morgan = require("morgan");
require("dotenv").config();

const app = express();

//Middlewares

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Routes
app.use("/", productRoutes);
app.use("/", imageRoutes);
app.use("/", categoryRoutes)

//config sv
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

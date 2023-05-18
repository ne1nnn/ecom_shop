const mongoose = require("mongoose");
const dbName = "SHOP-DB";
const server = "mongodb://127.0.0.1:27017/" + dbName;
mongoose
  .connect(server, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error de conexión con MongoDB"));

module.exports = mongoose;

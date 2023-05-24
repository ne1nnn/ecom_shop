import mongoose, { ConnectOptions } from "mongoose";

interface MongooseConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
}

const dbName = "shop_eco";
const con = `mongodb://127.0.0.1:27017/${dbName}`;

mongoose
  .connect(con, { useNewUrlParser: true } as MongooseConnectOptions)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error de conexión con MongoDB", err));

export default mongoose;

import express from "express";
import morgan from "morgan";
import cors from "cors";

//database
import "./src/_database/db";

//Routes
import userRoutes from "./src/routes/user.routes";
import productRouter from "./src/routes/product.routes";
import imagesRouter from "./src/routes/images.routes";

//Middlewares
const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());

//routes
app.use("/user", userRoutes);
app.use("/products", productRouter);
app.use("/images", imagesRouter);

const port = 5010;
app.listen(port, () => {
  console.log("Server listen on port " + port);
});

import express, { Router } from "express";
import { RequestHandler } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductById,
} from "../controllers/product.controller";
import { upload } from "../services/storage.service"; // Importa el middleware de Multer configurado

const router: Router = express.Router();

router.get("/all", getAllProducts as RequestHandler);
router.get("/:id", getProductById as RequestHandler);
router.post("/add", upload.single("image"), createProduct as RequestHandler);
// router.post("/upload/:id", upload as RequestHandler);
// router.delete("/:id", remove as RequestHandler);
router.put("/:id", updateProduct as RequestHandler);

export default router;

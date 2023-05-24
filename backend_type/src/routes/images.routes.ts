import express, { Request, Response, Router } from "express";
import path from "path";
import fs from "fs";

const router: Router = express.Router();

// Ruta para obtener la imagen
router.get("/:filename", (req: Request, res: Response) => {
  const filename: string = req.params.filename;
  const imagePath: string = path.join(
    __dirname,
    "../services/uploads/",
    filename
  );
  console.log(imagePath);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("No se encontró la imagen");
  }
});
router.get("/test", (req, res) => {
  res.send("asdasd");
});
export default router;

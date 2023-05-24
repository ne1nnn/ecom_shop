import express, { Router } from "express";
import { RequestHandler } from "express";
import {
  login,
  register,
  update,
  getAll,
  get,
  remove,
} from "../controllers/user.controller";

const router: Router = express.Router();

router.get("/", getAll as RequestHandler);
router.get("/:id", get as RequestHandler);
router.post("/login", login as RequestHandler);
router.post("/register", register as RequestHandler);
router.put("/:id", update as RequestHandler);
router.delete("/:id", remove as RequestHandler);

export default router;

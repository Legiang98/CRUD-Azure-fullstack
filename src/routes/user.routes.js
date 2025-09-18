// User routes
import { Router } from "express";
import {
  getUserProfile,
  updateUser,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/index.js";

const router = Router();

router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUser);
router.get("/", verifyToken, getAllUsers);
router.delete("/:id", verifyToken, deleteUser);

export default router;

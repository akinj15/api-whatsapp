import { Router } from "express";
import messageRoutes from "./messageRoutes"
import clientRoutes from "./clientRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/message", messageRoutes);
router.use("/client", clientRoutes);
router.use("/user", userRoutes);

export default router;      
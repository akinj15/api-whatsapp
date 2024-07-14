import { Router } from "express";
import messageRoutes from "./messageRoutes"
import clientRoutes from "./clientRoutes";

const router = Router();

router.use("/message", messageRoutes);
router.use("/client", clientRoutes);

export default router;      
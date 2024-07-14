import { Router } from "express";
import { clientController } from "../controllers";
const router = Router();


router.post("", clientController.create);
router.get("/:id", clientController.listClients);
router.get("/getAll", clientController.listClients);
router.put("", clientController.updateClient);

export default router;
  
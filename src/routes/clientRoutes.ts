import { Router } from "express";
import { clientController } from "../controllers";
const router = Router();


router.post("", clientController.create);
router.get("/getAll", clientController.listClients);
router.get("/:id", clientController.findClientById);
router.delete("/:id", clientController.deleteClient);
router.put("", clientController.updateClient);

export default router;
      
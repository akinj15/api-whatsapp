import { Router } from "express";
import { userController } from "../controllers";
import logginIsRequired from "../middleware/logginIsRequired";
const router = Router();

router.post("", userController.create)
router.post("/login", userController.login)
router.post("/password", userController.changePassword  );
router.get("/whoami", logginIsRequired, userController.whoAmI)
router.get("/getAll", logginIsRequired, userController.listUsers)
router.get("/:id", logginIsRequired, userController.findUserById);
router.get("", userController.listRoles);
router.put("", logginIsRequired, userController.updateUser);

export default router;
  
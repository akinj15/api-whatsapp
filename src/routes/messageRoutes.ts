import { Router } from "express";
import { messageController } from "../controllers";
import authorizationCheck from "../middleware/authorizationCheck";
import { uploadAvatar } from "../middleware/uploader";
import multer from "multer";
import logginIsRequired from "../middleware/logginIsRequired";
const router = Router();


router.get("/", logginIsRequired, messageController.listaMensagens);
router.post("/text", authorizationCheck, messageController.text);
router.post(
  "/document",
   authorizationCheck,
  multer(uploadAvatar.getConfig).single("file"),
  messageController.document
);

export default router;

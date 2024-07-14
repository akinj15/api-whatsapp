import { Router } from "express";
import { messageController } from "../controllers";
import authorizationCheck from "../middleware/authorizationCheck";
import { uploadAvatar } from "../middleware/uploader";
import multer from "multer";
const router = Router();


router.post("/text", messageController.text);
router.post(
  "/document",
  multer(uploadAvatar.getConfig).single("file"),
  messageController.document
);

export default router;
  
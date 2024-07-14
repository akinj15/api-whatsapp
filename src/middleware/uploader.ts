import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

class UploadAvatar {
  private URL: string = path.resolve(__dirname, "..", "..", "uploads");
  constructor() {}
  private storage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(this.URL)) {
          fs.mkdirSync(this.URL);
        }
        cb(null, this.URL);
      },
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}.${file.originalname}`);
      },
    });
  }
  private fileFilter() {
    return (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      const conditions = [
        "image/png",  
        "image/jpg",
        "image/jpeg",
        "application/pdf",
      ];

      if (conditions.includes(file.mimetype)) {
        cb(null, true);
      }
      cb(null, false);
    };
  }
  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
      fileFilter: this.fileFilter(),
    };
  }
}

export const uploadAvatar = new UploadAvatar();

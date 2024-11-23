import multer from "multer";
import { helpers } from "./files.helpers.js";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const { name } = req.body;
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const filename = `${name}_${file.fieldname}_${timestamp}${ext}`;
    cb(null, filename);
  },

  destination: (_, file, cb) => {
    const isSupported = helpers.checkSupportedTypes(file.mimetype);

    isSupported
      ? cb(null, "public/assets/img/")
      : cb("No soportamos este archivo");
  },
});

const uploadImage = multer({
  storage,
}).fields([
  { name: "banner", maxCount: 1 },
  { name: "photo1", maxCount: 1 },
  { name: "photo2", maxCount: 1 },
]);

export const middlewares = {
  uploadImage,
};

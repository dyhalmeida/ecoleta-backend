import express from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import ItemController from "./controllers/itemController";
import PointController from "./controllers/pointController";

const routes = express.Router();
const upload = multer(multerConfig);

routes.get("/", (request, response) =>
  response.json({ message: "E-coleta API running" })
);

routes.get("/items", ItemController.index);

routes.post("/points", upload.single("image"), PointController.store);
routes.get("/points", PointController.index);
routes.get("/points/:id", PointController.show);

export default routes;

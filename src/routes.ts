import express from "express";
import { celebrate, Joi } from "celebrate";

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

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        latitutde: Joi.number().required(),
        longitude: Joi.number().required(),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  PointController.store
);

routes.get("/points", PointController.index);
routes.get("/points/:id", PointController.show);

export default routes;

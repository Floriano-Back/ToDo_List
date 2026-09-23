import { Router } from 'express';
import controller from '../Controller/controller.js'

const routers = Router();

routers.get("/", controller.showAll);
routers.get("/:status", controller.showStatus);
routers.post("/", controller.create);
routers.delete("/:id", controller.delete);
routers.patch("/:id", controller.update);

export default routers;
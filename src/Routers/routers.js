import { Router } from 'express';
import controller from '../Controller/controller.js'

const routers = Router();

routers.get("/", controller.showAll);
routers.post("/", controller.create);

export default routers;
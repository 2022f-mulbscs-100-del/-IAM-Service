import { LoginController } from "../Controllers/LoginController.js";
import express from 'express';


const routes  = express.Router();
routes.post('/', LoginController)

export default routes;
import express from 'express';
import { SignUpController } from "../Controllers/SignUpController.js";

const routes  = express.Router();
routes.post('/', SignUpController)

export default routes;
import express from "express";
import { join, login } from "../controller/userController";
import { home } from "../controller/videoController";
const route = express.Router();

route.get("/", home);
route.get("/login", login);
route.get("/join", join);

export default route;
import express from "express";
import { getJoin, getLogin, postJoin, postLogin } from "../controller/userController";
import { home } from "../controller/videoController";
import { publicMiddleWare } from "../middlewares";
const route = express.Router();

route.get("/", home);
route.route("/login").all(publicMiddleWare).get(getLogin).post(postLogin);
route.route("/join").all(publicMiddleWare).get(getJoin).post(postJoin);

export default route;
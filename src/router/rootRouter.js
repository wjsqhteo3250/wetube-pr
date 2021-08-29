import express from "express";
import { getJoin, getLogin, postJoin, postLogin } from "../controller/userController";
import { home } from "../controller/videoController";
const route = express.Router();

route.get("/", home);
route.route("/login").get(getLogin).post(postLogin);
route.route("/join").get(getJoin).post(postJoin);

export default route;
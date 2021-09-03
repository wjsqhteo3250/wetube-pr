import express from "express";
import { deleteVideo, getUploadVideo, postUploadVideo, getUpdateVideo, watchVideo, postUpdateVideo } from "../controller/videoController";
import { privateMiddleWare } from "../middlewares";

const route = express.Router();

route.route("/upload").all(privateMiddleWare).get(getUploadVideo).post(postUploadVideo);
route.get("/:id([a-z0-9]{24})", watchVideo);
route.route("/:id([a-z0-9]{24})/update").all(privateMiddleWare).get(getUpdateVideo).post(postUpdateVideo);
route.post("/:id([a-z0-9]{24})/delete", privateMiddleWare, deleteVideo);
export default route;
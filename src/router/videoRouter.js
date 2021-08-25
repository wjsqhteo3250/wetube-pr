import express, { Router } from "express";
import { deleteVideo, getUploadVideo, postUploadVideo, getUpdateVideo, watchVideo, postUpdateVideo } from "../controller/videoController";

const route = express.Router();

route.route("/upload").get(getUploadVideo).post(postUploadVideo);
route.get("/:id([a-z0-9]{24})", watchVideo);
route.route("/:id([a-z0-9]{24})/update").get(getUpdateVideo).post(postUpdateVideo);
route.post("/:id([a-z0-9]{24})/delete", deleteVideo);
export default route;
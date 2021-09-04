import express from "express";
import { deleteVideo, getUploadVideo, postUploadVideo, getUpdateVideo, watchVideo, postUpdateVideo, commentApi, commentDelete } from "../controller/videoController";
import { privateMiddleWare, videoUpload } from "../middlewares";

const route = express.Router();

route.route("/upload").all(privateMiddleWare).get(getUploadVideo).post(videoUpload.single("video"), postUploadVideo);
route.get("/:id([a-z0-9]{24})", watchVideo);
route.route("/:id([a-z0-9]{24})/update").all(privateMiddleWare).get(getUpdateVideo).post(postUpdateVideo);
route.post("/:id([a-z0-9]{24})/delete", privateMiddleWare, deleteVideo);
route.post("/:id([0-9a-z]{24})/comment", commentApi);
route.delete("/:id([0-9a-z]{24})/commentDelete", commentDelete);
export default route;
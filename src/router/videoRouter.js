import express, { Router } from "express";
import { createVideo, deleteVideo, updateVideo, watchVideo } from "../controller/videoController";

const route = express.Router();

route.get("/create", createVideo);
route.get("/:id(\\d+)", watchVideo);
route.get("/:id(\\d+)/update", updateVideo);
route.get("/:id(\\d+)/delete", deleteVideo);
export default route;
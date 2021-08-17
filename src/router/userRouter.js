import express from "express";
import { deleteUser, editProfile, logout, profile } from "../controller/userController";

const route = express.Router();

route.get("/logout", logout);
route.get("/:id(\\d+)", profile);
route.get("/:id(\\d+)", editProfile);
route.get("/:id(\\d+)", deleteUser);

export default route

import express from "express";
import { deleteUser, getChangePassword, getEditProfile, githubRedirect, logout, postChangePassword, postEditProfile, profile, startGithubLogin } from "../controller/userController";

const route = express.Router();

route.get("/logout", logout);
route.get("/:id([a-z0-9]{24})", profile);
route.route("/:id([a-z0-9]{24})/edit").get(getEditProfile).post(postEditProfile);
route.route("/change-password").get(getChangePassword).post(postChangePassword);
route.get("/:id([a-z0-9]{24})", deleteUser);
route.get("/githubLogin", startGithubLogin);
route.get("/githubRedirect", githubRedirect);

export default route

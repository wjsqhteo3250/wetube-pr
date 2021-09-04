import express from "express";
import { deleteUser, getChangePassword, getEditProfile, githubRedirect, logout, naverRedirect, postChangePassword, postEditProfile, profile, startGithubLogin, startNaverLogin } from "../controller/userController";
import { avatarUpload, privateMiddleWare, publicMiddleWare } from "../middlewares";

const route = express.Router();

route.get("/logout", privateMiddleWare, logout);
route.get("/:id([a-z0-9]{24})", profile);
route.route("/:id([a-z0-9]{24})/edit").all(privateMiddleWare).get(getEditProfile).post(avatarUpload.single("avatar"), postEditProfile);
route.route("/change-password").all(privateMiddleWare).get(getChangePassword).post(postChangePassword);
route.get("/:id([a-z0-9]{24})/delete", privateMiddleWare, deleteUser);
route.get("/githubLogin", publicMiddleWare, startGithubLogin);
route.get("/githubRedirect", publicMiddleWare, githubRedirect);
route.get("/naverLogin", publicMiddleWare, startNaverLogin);
route.get("/naverRedirect", publicMiddleWare, naverRedirect);

export default route

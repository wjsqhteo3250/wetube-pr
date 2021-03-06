import "dotenv/config";
import "./db";
import express from "express";
import pug from "pug";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./router/rootRouter";
import videoRouter from "./router/videoRouter";
import userRouter from "./router/userRouter";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";
import flash from "express-flash";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL })
}))
app.use(flash());
app.use(localsMiddleware);
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use("/uploads", express.static("uploads"));
app.use("/js", express.static("js"));
app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);


app.listen(4000, () => console.log("work"));
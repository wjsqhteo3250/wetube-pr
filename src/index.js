import express from "express";
import pug from "pug";
import morgan from "morgan";
import rootRouter from "./router/rootRouter";
import videoRouter from "./router/videoRouter";
import userRouter from "./router/userRouter";

const app = express();

app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);


app.listen(4000, () => console.log("work"));
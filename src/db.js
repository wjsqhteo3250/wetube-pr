import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const db = mongoose.connection;

db.on("error", (error) => console.log("db error", error));
db.once("open", () => console.log("connected to DB"));
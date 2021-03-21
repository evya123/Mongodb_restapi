import express from "express";
import authorityRouter from "./authority";
import userRouter from "./user";

var app = express();

app.use("/authority", authorityRouter);
app.user("/user", userRouter);
export default app;

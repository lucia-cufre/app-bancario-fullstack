import app from "./app";
import { userRouter } from "./Router/userRouter";

app.use("/user", userRouter);

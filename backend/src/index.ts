import { transactionRouter } from './Router/transactionRouter';
import app from "./app";
import { userRouter } from "./Router/userRouter";

app.use("/ng-cash/user", userRouter);
app.use("/ng-cash/transactions", transactionRouter)

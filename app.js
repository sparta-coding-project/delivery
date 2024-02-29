const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRouter = require("./src/routers/auth.router");
const userRouter = require("./src/routers/user.router");
const ordersRouter = require("./src/routers/orders.router");
const storeRouter = require("./src/routers/store.router");
const cartsRouter = require("./src/routers/carts.router");
const emailRouter = require("./src/routers/email.router");
const menuRouter = require("./src/routers/menu.router")

const reviewRouter = require("./src/routers/review.router");
const { connectDB } = require("./src/typeorm/index");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
connectDB();

app.use("/auth", authRouter);

app.use("/users", userRouter);
app.use("/api", [ordersRouter, cartsRouter, menuRouter]);
app.use("/stores", storeRouter);
app.use("/", emailRouter);
app.use("/reviews", reviewRouter);

// app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

require("dotenv").config();
require("../config");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const { authRouter, userRouter } = require("../routes");

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

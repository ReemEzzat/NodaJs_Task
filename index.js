const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv");

dotenv.config();

const app = express()

// app level middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postsRouter);

// error handler middleware
app.use(errorHandler);


app.get('/health', (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Server is running smoothly"
  });
});

// start server 
const DB_NAME = process.env.DB_NAME;
const DB_URI = process.env.DB_URI.replace(/\/+$/, '');
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`✅✅ Server is running on http://localhost:${PORT}`);
    mongoose.connect(`${DB_URI}/${DB_NAME}`).then(() => {
        console.log("✅✅ DB connection is successful");
    }).catch((err) => {
        console.log("❌❌ DB connection is failed", err);
    })
})

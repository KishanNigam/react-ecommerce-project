const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "uploads"))
);



// API routes
app.use("/api", require("./routes"));

// auth routes add
app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// error handler (last middleware)
const { errorHandler } = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;

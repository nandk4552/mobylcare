const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env configuration
dotenv.config();

//DB connection
connectDB();

// rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Mobylcare Backend Server</h1>");
});
//authentication routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
//user routes
app.use("/api/v1/user", require("./routes/userRoutes"));
//order routes
app.use("/api/v1/order", require("./routes/orderRoutes"));
//customer routes
app.use("/api/v1/customer", require("./routes/customerRoutes"));
//employee routes
app.use("/api/v1/employees", require("./routes/employeeRoutes"));
//inventory routes
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

// Catch all other routes
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.white.bgMagenta.bold);
});

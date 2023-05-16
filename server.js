const express = require("express");
require("dotenv").config();
const colors = require("colors");
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Database
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/blog", require("./routes/blog.route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

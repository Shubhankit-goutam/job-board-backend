const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const jobRoutes = require("./routes/jobs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on 5000")))
  .catch(err => console.log(err));
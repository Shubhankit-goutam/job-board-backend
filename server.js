const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const jobRoutes = require("./routes/jobs");

const app = express();


app.use(cors({
  origin: "https://jobsboardsa.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: false 
}));

app.options("*", cors());

app.use(express.json());

app.use("/api/jobs", jobRoutes);

app.get("/test-cors", (req, res) => {
  res.json({ message: "Speedhot CORS is working!" });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => console.error("MongoDB connection error:", err));

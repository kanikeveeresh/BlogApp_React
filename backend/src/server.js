const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const postsRouter = require("./routes/postRoute.js");
const credentialsRouter = require("./routes/credentialsRoute.js")

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

mongoose.connect(process.env.MONGO_URI, {
  family: 4,
})
.then(() => console.log("Connected to MongoDB."))
.catch(err => console.error("MongoDB connection error:", err));

app.use("/api/posts", postsRouter)
app.use("/api", credentialsRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

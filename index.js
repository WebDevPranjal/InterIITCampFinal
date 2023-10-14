import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();

// Configure body-parsing middleware before defining routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/LoginData")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("Failed to connect");
  });

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

const collection = new mongoose.model("collection", LoginSchema);

app.post("/home", async (req, res) => {
  res.cookie("token", "iamin", {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  const { name, password } = req.body;
  await collection.create({
    name,
    password,
  });
  res.send("ok");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/login", (req, res) => {
  res.send("Welcome to the home page");
});

app.post("/register", async (req, res) => {
  res.render("signup.ejs");
  res.cookie("token", "iamin", {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
});

app.listen(3000, () => {
  console.log("Server is listening");
});

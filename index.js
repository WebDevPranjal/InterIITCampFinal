const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Configure body-parsing and cookie-parsing middleware before defining routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Add this line
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost:27017/LoginData")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Failed to connect:", err);
  });

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

const schemeschema = new mongoose.Schema({
  name: String,
  video_link: String,
  description: String,
});
const schemes = new mongoose.model("scheme", schemeschema);
const collection = new mongoose.model("collection", LoginSchema);

app.get("/", (req, res) => {
  res.render("loginPage.ejs");
});

app.post("/home", async (req, res) => {
  try {
    const { name, password } = req.body;
    await collection.create({ name, password });
    res.status(201).send("Registered successfully");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Registration failed");
  }
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  //   console.log(name);
  try {
    const check = await collection.findOne({ name });
    console.log(check);
    if (check && check.password === password) {
      res.render("homePage.ejs");
    } else {
      res.status(401).send("Authentication failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Login failed");
  }
});

app.post("/register", async (req, res) => {
  res.render("signup.ejs");
});

app.get("/chw", (req, res) => {
  res.render("chw.ejs");
});

app.get("/complain", (req, res) => {
  res.render("complainPortal.ejs");
});

app.get("/findDoctor", (req, res) => {
  res.render("hospital.ejs");
});

app.listen(10000, () => {
  console.log("Server is listening");
});

app.get("/schemes", async (req, res) => {
  const data = await schemes.find({});
  console.log(data[0].video_link);
  res.render("scheme.ejs", { data });
});

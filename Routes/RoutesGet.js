const axios = require("axios").default;
const express = require("express");
const Router = express.Router();
const User = require("../MODELS/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  resisterValidation,
  loginValidation,
} = require("../MIDDLEWARES/validation");
const verifyToken = require("./PrivateRoute");

Router.post("/api/SearchCaracterName", (req, res, next) => {
  const name = req.body.name;

  const options = {
    method: "POST",
    url: "https://xivapi.com/character/search",
    params: { name: name },
    headers: {
      cookie: "__cfduid=dcc93a08131647be8265fa420161cd40a1619759691",
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(req.body);
      const information = response.data;
      res.send(information);
    })
    .catch((error) => {
      console.error(error);
    });
});

Router.post("/api/SearchCaracterByID", (req, res) => {
  const ID = JSON.parse(JSON.stringify(req.body.id));

  const options = {
    method: "POST",
    url: `https://xivapi.com/character/${ID}`,
    headers: {
      cookie: "__cfduid=dcc93a08131647be8265fa420161cd40a1619759691",
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(req.body);
      const information = response.data;
      res.send(information);
    })
    .catch((error) => {
      console.error(error);
    });
});

Router.post("/api/getAllPatchList", (req, res) => {
  const options = {
    method: "POST",
    url: `https://xivapi.com/patchlist`,
    headers: {
      cookie: "__cfduid=dcc93a08131647be8265fa420161cd40a1619759691",
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(req.body);
      const information = response.data;
      res.send(information);
    })
    .catch((error) => {
      console.error(error);
    });
});

Router.post("/api/getDeepDungeon/thePalaceOfTheDead", (req, res) => {
  const options = {
    method: "POST",
    url: `https://xivapi.com/DeepDungeonBan`,
    headers: {
      cookie: "__cfduid=dcc93a08131647be8265fa420161cd40a1619759691",
    },
  };

  axios
    .request(options)
    .then((response) => {})
    .catch((error) => {
      console.error(error);
    });
});

Router.post("/api/getDeepDungeon/HeavenOnHight", (req, res) => {
  const options = {
    method: "POST",
    url: `https://xivapi.com/DeepDungeonDanger`,
    headers: {
      cookie: "__cfduid=dcc93a08131647be8265fa420161cd40a1619759691",
    },
  };

  axios.request(options).then((response) => {
    console.log(req.body);
    const information = response.data;
    res.send(information);
    console.error(error);
  });
});

Router.post("/api/register", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE WE MAKE A USER

  const { error } = resisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // WE CHECK IF THE EMAIL EXISTS
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email is not found");

  // LETS HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATE A NEW USER
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send("USER WELL CREATED");
  } catch (error) {
    res.status(400).send(error);
  }

  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.name);
});

Router.post("/api/login", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE WE MAKE A USER

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ Error: error.details[0].message });

  // WE CHECK IF THE EMAIL EXISTS
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ Error: "Email is not found" });

  // PASSWORD CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ Error: "Invalid Password" });

  // CREATE A TOKEN

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.header("Auth-token", token).json({ token: token });

  console.log(req.body.email);
  console.log(req.body.password);
});

Router.get("/api/posts", verifyToken, (req, res) => {
  res.send({ name: "My first post" });
});

Router.get("/api/LoggedIn", verifyToken, (req, res) => {
  res.send(JSON.stringify(req.user));
});

module.exports = Router;

const axios = require("axios").default;
const express = require("express");
const Router = express.Router();

Router.get("/", (req, res, next) => {
  res.send("Hey you're on HOME");
  next();
});

Router.get("/api", (req, res, next) => {
  res.send("Hey you're on my api");
  next();
});

Router.get("/api/one", (req, res, next) => {
  res.send("Hey you're on a specific api");
  next();
});


Router.get("/api/searchCaracter", (req, res, next) => {

    const axios = require("axios").default;

    const options = {
    method: 'GET',
    url: 'https://xivapi.com/character/search',
    params: {name: 'Ora Ryu', server: 'Moogle'},
    headers: {cookie: '__cfduid=dcc93a08131647be8265fa420161cd40a1619759691'}
    };

    axios.request(options)
    .then((response) => {
        console.log(response.data);
        res.json(response.data);
    })
    .catch((error) => {
        console.error(error);
    });

});

module.exports = Router;

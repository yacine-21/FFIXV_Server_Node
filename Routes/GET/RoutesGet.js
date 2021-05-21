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




Router.post("/api/SearchCaracterName", (req, res, next) => {

  const name = (req.body.name);
  console.log("Le nom du joueur que tu recherche est : " + name);

    const options = {
    method: 'POST',
    url: 'https://xivapi.com/character/search',
    params: {name: name},
    headers: {
      cookie: '__cfduid=dcc93a08131647be8265fa420161cd40a1619759691','Access-Control-Allow-Origin': '*',
      mode: 'cors',
    },
    };


    axios.request(options)
    .then((response) => {
        console.log(req.body);
        const information =  response.data;
        res.send(information);
    })
    .catch((error) => {
        console.error(error);
    });
});

Router.post("/api/SearchCaracterByID", (req, res, next) => {

    const ID = JSON.parse(JSON.stringify(req.body.id));

    const options = {
    method: 'POST',
    url: `https://xivapi.com/character/${ID}`,
    headers: {
      cookie: '__cfduid=dcc93a08131647be8265fa420161cd40a1619759691','Access-Control-Allow-Origin': '*',
      mode: 'cors',
    },
    };


    axios.request(options)
    .then((response) => {
        console.log(req.body);
        const information =  response.data;
        res.send(information);
    })
    .catch((error) => {
        console.error(error);
    });
});


Router.post("/api/test", (req,res,next) =>{
  const name = JSON.parse(JSON.stringify(req.body.name));
  console.log(req.body);
  console.log("Le nom du joueur que tu recherche est : " + name);
})

module.exports = Router;

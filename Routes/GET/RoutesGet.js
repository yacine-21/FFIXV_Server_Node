const axios = require("axios").default;
const express = require("express");
const Router = express.Router();

Router.post("/api/SearchCaracterName", (req, res, next) => {

  const name = (req.body.name);
  console.log("Le nom du joueur que tu recherche est : " + name);

    const options = {
    method: 'POST',
    url: 'https://xivapi.com/character/search',
    params: {name: name},
    headers: {
      cookie: '__cfduid=dcc93a08131647be8265fa420161cd40a1619759691'},
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
      cookie: '__cfduid=dcc93a08131647be8265fa420161cd40a1619759691'},
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

Router.post("/api/getAllPatchList", (req, res, next) => {

  
  const options = {
    method: 'POST',
    url: `https://xivapi.com/patchlist`,
    headers: {
      cookie: '__cfduid=dcc93a08131647be8265fa420161cd40a1619759691'},
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


Router.post("/api/getDeepDungeon/thePalaceOfTheDead", (req, res, next) => {

  
  const options = {
    method: 'POST',
    url: `https://xivapi.com/DeepDungeonBan`,
    headers: {
      cookie: '__cfduid=dcc93a08131647be8265fa420161cd40a1619759691'},
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

Router.post("/api/getDeepDungeon/HeavenOnHight", (req, res, next) => {

  
  const options = {
    method: 'POST',
    url: `https://xivapi.com/DeepDungeonDanger`,
    headers: {
      cookie: '__cfduid=dcc93a08131647be8265fa420161cd40a1619759691'},
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


module.exports = Router;

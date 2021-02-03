const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { 
    title, 
    url, 
    techs 
  } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repository);
  response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const { 
    url, 
    title, 
    techs 
  } = request.body;

  if(!isUuid(id)){
    return response.status(400).send();
  }

  const repository = repositories.find((rep) => rep.id === id);
  if (repository) {
    repository.url = url;
    repository.title = title;
    repository.techs = techs;
    return response.status(200).json(repository);
  } 
  return response.status(400).send();
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;

  if(!isUuid(id)){
    return response.status(400).send();
  }

  const repository = repositories.find( rep => rep.id === id);
  if (repository) {
    index = repositories.indexOf(repository)
    repositories.splice(index, 1);
    return response.status(204).send();
  } 
  return response.status(400).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id;

  if(!isUuid(id)){
    return response.status(400).send();
  }

  const repository = repositories.find( rep => rep.id === id);
  if (repository) {
    repository.likes++;
    return response.status(201).send(repository);
  } 
  return response.status(400).send();
});

module.exports = app;

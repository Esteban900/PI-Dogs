const { Router } = require("express");
const { getDogsHandler, getIdDogsHandler } = require ("../handlers/dogsHandlers");
const { createDogsHandler } = require ("../handlers/postHandlers");

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:id", getIdDogsHandler);

dogsRouter.post("/", createDogsHandler);




module.exports = dogsRouter;
const express = require("express");
require("dotenv").config();
var morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
const password = process.argv[2];

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
mongoose.connect(url, { family: 4 });
const Person = require("./models/person");
const { log } = require("console");
const console = require("console");

morgan.token("http_post", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return " ";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :http_post",
  ),
);

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toUTCString()}</p>`);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const idToDelete = request.params.id;
  const person = Person.find((person) => person.id === idToDelete);

  if (!person) {
    return response.status(404).json({
      error: "person not found",
    });
  }

  persons = persons.filter((person) => person.id !== idToDelete);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;

  if (!person.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  if (!person.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  if (persons.some((p) => p.name === person.name)) {
    return response.status(400).json({
      error: "name already exists",
    });
  }

  const newPerson = new Person({
    name: person.name,
    number: person.number,
  });

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
  response.json(person);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

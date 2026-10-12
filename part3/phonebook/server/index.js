const express = require("express");
var morgan = require("morgan");
const app = express();
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.filter((person) => person.id === id);
  person.length > 0 ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const idToDelete = request.params.id;
  const person = persons.find((person) => person.id === idToDelete);

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

  person.id = String(Math.floor(Math.random() * 8999999999999999));
  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

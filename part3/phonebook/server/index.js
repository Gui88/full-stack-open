const express = require('express')
require('dotenv').config()
var morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
mongoose.connect(url, { family: 4 })
const Person = require('./models/person')
const console = require('console')

morgan.token('http_post', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ' '
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :http_post',
  ),
)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body

  if (!person.name) {
    return response.status(400).json({
      error: 'name is missing',
    })
  }

  if (!person.number) {
    return response.status(400).json({
      error: 'number is missing',
    })
  }

  const newPerson = new Person({
    name: person.name,
    number: person.number,
  })

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
app.use(errorHandler)
app.use(unknownEndpoint)
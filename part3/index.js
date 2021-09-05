require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
var morgan = require('morgan');
const cors = require('cors')
const app = express();
const Person = require('./models/person');

app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
      res.json(people)
    });
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
      res.json(person);
    });
});

app.delete('/api/persons/:id', (req, res) => {
    // const id = Number(req.params.id);
    // persons = persons.filter(person => person.id !== id);
    Person.remove({ id: req.params.id });
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    //const existingPerson = persons.find(person => person.name === body.name);

    if (!body.name || !body.number) {
        return res.status(400).json({error: 'name or number missing'});
    }

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
      res.json(savedPerson);
    })
});

app.get('/api/info', (req, res) => {
    let date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <br></br> ${date}`);
});

const PORT = process.env.PORT || 3001
app.listen(PORT);
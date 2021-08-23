const express = require('express');
var morgan = require('morgan');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    console.log(persons);
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const persons = persons.find(person => person.id === id);
    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const existingPerson = persons.find(person => person.name === body.name);

    if (!body.name || !body.number) {
        return res.status(400).json({error: 'name or number missing'});
    } 

    let newId = Math.floor(Math.random() * 20);

    const person = {
        id: newId,
        name: body.name,
        number: body.number
    }

    console.log(person);
    persons = persons.concat(person);
    res.json(person);
});

app.get('/api/info', (req, res) => {
    let date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <br></br> ${date}`);
});

const PORT = process.env.PORT || 3001
app.listen(PORT);
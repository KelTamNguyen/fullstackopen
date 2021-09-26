/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
var morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));

app.get('/api/persons', (req, res) => {
	Person.find({}).then(people => {
		res.json(people);
	});
});

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person.toJSON());
			} else {
				res.status(404).end();
			}
		})
		.catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({error: 'name or number missing'});
	}

	const person = new Person({
		name: body.name,
		number: body.number
	});

	person
		.save()
		.then(savedPerson => {
			res.json(savedPerson.toJSON());
		})
		.catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then(updatedPerson => {
			res.json(updatedPerson.toJSON());
		})
		.catch(err => next(err));
});

app.get('/info', (req, res) => {
	Person.find({}).then((persons) => {
		res.send(
			`<div><span>Phonebook has info for ${persons.length} people</span></div>
        <span>${new Date().toString()}</span>`,
		);
	});
});

const unknownEndpoint = (req, res) => {
	return res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
	console.error(err.message);

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (err.name === 'ValidationError') {
		return res.status(400).send({ error: err.message });
	}

	next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
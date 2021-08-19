import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    personService
      .getPersons()
      .then(intitialPersons => setPersons(intitialPersons))
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleQuery = (event) => {
    setQuery(event.target.value);
    setPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const addNewPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);
    const newPerson = { name: newName, number: newNumber};

    if (existingPerson === undefined) {
      personService
        .createPerson(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .updatePerson(newPerson, existingPerson.id)
            .then(() => {
              personService
                .getPersons()
                .then(persons => setPersons(persons))
            })
        }
    }
    setNewName('');
    setNewNumber('');
  }

  const deletePerson = (id, name) => {
    window.confirm(`Delete ${name}?`)
    personService
      .deletePerson(id)
      .then(() => {
        personService
          .getPersons()
          .then(persons => setPersons(persons))
      })
  }

  return (
    <div className="flex-container">
      <div className="flex-child">
        <h2>Phonebook</h2>
        <Filter queryValue={query} handleQuery={handleQuery} />
        <h2>Add a new</h2>
        <PersonForm 
          nameValue={newName}
          numberValue={newNumber}
          handleSubmit={addNewPerson}
          handleNewName={handleNewName}
          handleNewNumber={handleNewNumber}
        />
      </div>
      <div className="flex-child numbers-list">
        <h2>Numbers</h2>
        <Persons persons={persons} handleDelete={deletePerson} />
      </div>
    </div>
  )
}

export default App
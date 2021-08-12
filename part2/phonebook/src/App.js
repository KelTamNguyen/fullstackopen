import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter'
import axios from 'axios'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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

  const addNewName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber};
    if (persons.filter(person => person.name === newName).length === 0) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName('');
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
          handleSubmit={addNewName}
          handleNewName={handleNewName}
          handleNewNumber={handleNewNumber}
        />
      </div>
      <div className="flex-child numbers-list">
        <h2>Numbers</h2>
        <Persons persons={persons} />
      </div>
    </div>
  )
}

export default App
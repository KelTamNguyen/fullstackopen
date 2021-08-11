import React, { useState } from 'react'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ query, setQuery ] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [ queriedPersons, setQueriedPersons ] = useState(persons);

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
    <div>
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
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
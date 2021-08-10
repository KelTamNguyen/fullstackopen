import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const addNewName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    if (persons.includes(newPerson)){
      alert(`${newPerson.name} is already added to the phonebook`);
      console.log('success')
    } else {
      setPersons(persons.concat(newPerson));
      console.log('failure')
    }
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App

// const Note = ({ note }) => {
//   return (
//     <li>{note.content}</li>
//   )
// }

// const App = () => {
//   const noteList = [
//     {
//       id: 1,
//       content: 'HTML is easy',
//       date: '2019-05-30T17:30:31.098Z',
//       important: true
//     },
//     {
//       id: 2,
//       content: 'Browser can execute only JavaScript',
//       date: '2019-05-30T18:39:34.091Z',
//       important: false
//     },
//     {
//       id: 3,
//       content: 'GET and POST are the most important methods of HTTP protocol',
//       date: '2019-05-30T19:20:14.298Z',
//       important: true
//     }
//   ]
//   const [notes, setNotes] = useState(noteList)
//   const [newNote, setNewNote] = useState(
//     'a new note...'
//   ) 

//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       date: new Date().toISOString(),
//       important: Math.random() > 0.5,
//       id: notes.length + 1,
//     }
    
//     setNotes(notes.concat(noteObject))
//     setNewNote('')
//   }

//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input
//           value={newNote}
//           onChange={handleNoteChange}
//         />
//         <button type="submit">save</button>
//       </form>  
//     </div>
//   )
// }

// export default App
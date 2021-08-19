import React from 'react'

export default function Person({ persons, handleDelete }) {
    return (
        persons.map(person => 
            <div>
                <span><p key={person.number}>{person.name} {person.number}</p></span>
                <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
            </div>
        )
    )
}

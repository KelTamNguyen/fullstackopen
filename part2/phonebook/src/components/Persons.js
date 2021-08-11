import React from 'react'

export default function Person({ persons }) {
    return (
        persons.map(person => <p key={person.number}>{person.name} {person.number}</p>)
    )
}

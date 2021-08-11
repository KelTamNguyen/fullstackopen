import React from 'react'

export default function PersonForm({ nameValue, numberValue,  handleSubmit, handleNewName, handleNewNumber }) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
            name: <input value={nameValue} onChange={handleNewName} />
            </div>
            <div>
            number: <input value={numberValue} onChange={handleNewNumber} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}
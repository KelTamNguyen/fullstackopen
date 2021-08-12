import React from 'react'
import  '../index.css'

export default function PersonForm({ nameValue, numberValue,  handleSubmit, handleNewName, handleNewNumber }) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>name:</label> 
                <input value={nameValue} onChange={handleNewName} />
            </div>
            <div>
                <label>number:</label> 
                <input value={numberValue} onChange={handleNewNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
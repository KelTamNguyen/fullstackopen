import React from 'react'

export default function Filter({ queryValue, handleQuery }) {
    return (
        <div>filter shown with: <input value={queryValue} onChange={handleQuery}></input></div>
    )
}

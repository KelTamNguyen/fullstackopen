import React from 'react'
import '../index.css'

export default function Notification({ content }) {
    if (content === null) {
        return null;
    }

    const {message, type} = content;

    return (
        <div className={type}>
            {message}
        </div>
    )
}

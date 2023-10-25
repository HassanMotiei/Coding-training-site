import React from 'react'
import './ErrorBox.css'

export default function ErrorBox({msg}) {
    return (
        <div className="cms-empty-err">
            <p>{msg}</p>
        </div>
    )
}

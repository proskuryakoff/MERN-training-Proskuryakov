import React from 'react';
import './Input.css'

const input = props => {
    return(
        <input className='default-input' 
            placeholder={props.placeholder}
            type={props.type}
            id={props.id}
            name={props.name}
        />
    )
}

export default input;
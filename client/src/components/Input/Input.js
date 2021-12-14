import React from 'react';
import './Input.css'

const input = props => {
    return(
        <input className={props.className}
            placeholder={props.placeholder}
            type={props.type}
            id={props.id}
            name={props.name}
            required={props.required}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    )
}

export default input;
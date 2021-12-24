import React from 'react';
import './Form.css'

const Form = (props) => {
    return (
        <div className='form'>
            <h1>{props.title}</h1>
            {props.children}
        </div>
    )
}

export default Form;
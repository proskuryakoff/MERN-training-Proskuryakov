import React from 'react';
import './Form.css'

const Form = (props) => {
    return (
        <div className='form'>
            <div className='form-field'>
                <h1>{props.title}</h1>
                {props.children}
            </div>
        </div>  
    )
}

export default Form;
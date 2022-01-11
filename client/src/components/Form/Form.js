import React from 'react';
import './Form.css'

const Form = (props) => {
    return (
        <form className='form' 
            onSubmit={props.onSubmit} 
            encType={props.encType}
            action={props.action}
            method={props.method}
            >
            <div className='form-field'>
                <h1>{props.title}</h1>
                {props.children}
            </div>
        </form>  
    )
}

export default Form;
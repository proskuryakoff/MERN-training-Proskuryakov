import React from 'react';
import './TextArea.css'

const TextArea = (props) => {
    return(
        <textarea className={props.className}
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur} 
        rows={props.rows}
        />
    )
}

export default TextArea;
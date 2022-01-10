import React from 'react';
import './Button.css'

const button = props => (
    <button className={props.className}
    onClick={props.onClick} 
    disabled={props.disabled}
    type={props.type}
    >
        {props.loading ? 'Loading...' : props.children}
    </button>
)

export default button;
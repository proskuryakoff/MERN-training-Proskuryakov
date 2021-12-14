import React from 'react';
import { Link } from 'react-router-dom';


import './Button.css'

const button = props => (
    <button className={props.className}
    onClick={props.onClick} 
    disabled={props.disabled}
    >
        {props.loading ? 'Loading...' : props.children}
    </button>
)

export default button;
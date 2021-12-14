import React from 'react';
import { Link } from 'react-router-dom';


import './Button.css'

const button = props => (
    <button className='Button'>
        {props.loading ? 'Loading...' : props.children}
    </button>
)

export default button;
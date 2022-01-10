import React from "react";
import {Link} from 'react-router-dom'
import './Card.css'

const Card = (props) => (
    <div className="card">
        <Link to={'/content/'+ props.id} className="title">{props.title}</Link>
        <div>{props.description}</div>
        <div>{props.created}</div>
    </div>
)

export default Card;
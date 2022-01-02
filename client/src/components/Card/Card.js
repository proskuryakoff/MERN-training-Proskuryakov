import React from "react";
import {Link} from 'react-router-dom'
import './Card.css'

const Card = (props) => (
    <div className="card">
        <Link to={'/post/'+ props.id}>{props.title}</Link>
        <div>{props.content}</div>
    </div>
)

export default Card;
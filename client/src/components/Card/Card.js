import React from "react";
import './Card.css'

const Card = (props) => (
    <div className="card">
        <h1>{props.title}</h1>
        <div>{props.content}</div>
    </div>
)

export default Card;
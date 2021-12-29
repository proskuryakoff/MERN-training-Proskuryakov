import React from "react";

const Card = (props) => (
    <div className="card">
        <h1>{props.title}</h1>
        <div>{props.content}</div>
    </div>
)

export default Card;
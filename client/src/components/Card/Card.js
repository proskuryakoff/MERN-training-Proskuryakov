import React from "react";
import {Link} from 'react-router-dom'
import VideoThumbnail from 'react-video-thumbnail';
import './Card.css'

const Card = (props) => {
    return(
    <div className="card">
        <Link to={'/content/'+ props.id} className="title">{props.title}</Link>
            {props.type === 'video/mp4' 
                ? 
                <VideoThumbnail 
                videoUrl={"http://localhost:4000/content/" + props.id}
                />
                :
                <></>
            }
        <div>{props.created}</div>
    </div>
    )
}

export default Card;
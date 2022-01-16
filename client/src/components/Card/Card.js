import React from "react";
import {Link} from 'react-router-dom'
import VideoThumbnail from 'react-video-thumbnail';
import { FormatDate } from "../../utils/FormatDate";
import './Card.css'

const Card = (props) => {
    return(
    <div className="card">
        <div className="card-type">{props.type === 'video/mp4' ? 'Video' : 'Audio'}</div>
        <Link to={'/content/'+ props.id} className="title">{props.title}</Link>
            {props.type === 'video/mp4' 
                ? 
                <VideoThumbnail 
                videoUrl={"http://localhost:4000/content/" + props.id + '/media'}
                />
                :
                <></>
            }
        <div className="card-created">Published: {FormatDate(props.created)}</div>
    </div>
    )
}

export default Card;
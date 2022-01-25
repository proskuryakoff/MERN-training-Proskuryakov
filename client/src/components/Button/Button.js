import React from 'react';
import like from '../../assets/like.png'
import likeActive from '../../assets/like_active.png'
import './Button.css'

const button = (props) => {
    if (props.className === 'like-button') {
        if (props.liked) {
            return (
                <button
                className='like-button-active'
                onClick={props.onClick} 
                id={props.id}
                disabled={props.disabled}
                >
                    <img src={likeActive} className='like-icon'/>
                    {props.likeAmount}
                </button>
            )
        }
        return (
            <button
            className={props.className}
            onClick={props.onClick} 
            id={props.id}
            disabled={props.disabled}
            >
                <img src={like} className='like-icon'/>
                {props.likeAmount}
            </button>
        )
    }
    return (
        <button className={props.className}
        onClick={props.onClick} 
        disabled={props.disabled}
        type={props.type}
        id={props.id}
        >
            {props.loading ? 'Loading...' : props.children}
        </button>
    )
}
    

export default button;
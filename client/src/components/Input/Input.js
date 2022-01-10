import React from 'react';
import { categoryList } from '../../utils/CategoryList';
import './Input.css'

const input = props => {
    if (props.type === 'select') {
        return (
            <select className={props.className}
                id={props.id}
                name={props.name}
                required={props.required}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            >
                {categoryList.map((option) => {
                    return(
                        <option key={option}>{option}</option>
                    )
                })}
            </select>
        )
    }
    return(
        <input className={props.className}
            placeholder={props.placeholder}
            type={props.type}
            id={props.id}
            name={props.name}
            required={props.required}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    )
}

export default input;
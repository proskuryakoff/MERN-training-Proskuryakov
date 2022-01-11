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
                {categoryList.sort().map((option) => {
                    return(
                        <option key={option} value={option}>{option}</option>
                    )
                })}
            </select>
        )
    }

    if (props.className === 'search-input') {
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

    return(
        <div className='input-field'>
            <label htmlFor={props.htmlFor}>{props.placeholder}</label>
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
        </div>
     
    )
}

export default input;
import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import searchIcon from '../../assets/search.png'
import './Search.css'

const Search = props => {
    return(
        <div className='search-field'>
            <Input 
            className='search-input'
            placeholder='Search'
            />
            <Button className='search-button'><img src={searchIcon}/></Button>
        </div>
    )
}

export default Search;
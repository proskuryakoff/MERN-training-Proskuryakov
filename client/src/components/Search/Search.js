import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import searchIcon from '../../assets/search.png'
import './Search.css'

const Search = props => {
    const [form,setForm] = useState({
        searchQuery: ''
    });
    
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    
    const searchHandler = async() => {
        try{
           console.log({...form});
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
    return(
        <div className='search-field'>
            <Input 
            name='searchQuery'
            id='searchQuery'
            className='search-input'
            placeholder='Search'
            onChange={changeHandler}
            />
            <Button 
                className='search-button'
                onClick={searchHandler}
            >
                <img src={searchIcon}/>
            </Button>
        </div>
    )
}

export default Search;
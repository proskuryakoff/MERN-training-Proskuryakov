import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
import Input from '../Input/Input';
import Button from '../Button/Button';
import searchIcon from '../../assets/search.png'
import './Search.css'

const Search = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form,setForm] = useState('');
    
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    
    const searchHandler = async() => {
        try{
           dispatch(getPostsBySearch(form))
           navigate('/search?searchQuery=' + form.searchQuery)
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
                <img src={searchIcon} className='search-icon'/>
            </Button>
        </div>
    )
}

export default Search;
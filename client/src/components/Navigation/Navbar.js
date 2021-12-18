import React from 'react';
import Search from '../Search/Search'
import { NavLink } from 'react-router-dom';
import './Navbar.css'


const navbar = props => (
    <header className='Navbar'>
        <NavLink to="/" className='nav-link'>Home</NavLink>
        <Search />
        <div className='auth-nav'>
            <NavLink to='/api/auth/login' className='nav-link'>Log In</NavLink>
            <NavLink to='/api/auth/register' className='nav-link'>Register</NavLink>
            <a href='/' className='nav-link'>Logout</a>
        </div>
    </header>
)

export default navbar;
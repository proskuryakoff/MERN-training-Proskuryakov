import React from 'react';
import Search from '../Search/Search'
import './Navbar.css'

const navbar = props => (
    <header className='Navbar'>
        <div>Menu</div>
        <Search />
        <nav>
            <a href='/api/auth/login' className='nav-link'>Login</a>
            <a href='/api/auth/register' className='nav-link'>Register</a>
        </nav>
    </header>
)

export default navbar;
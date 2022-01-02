import React, {useContext} from 'react';
import Search from '../Search/Search'
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { AuthContext } from '../../context/AuthContext';
    
const Navbar = props => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/', {replace: true})
    }
    return(
        <header className='Navbar'>
            <NavLink to="/" className='nav-link'>Home</NavLink>
            {auth.isAuthenticated
            ?  <NavLink to="/create" className='nav-link'>Create Post</NavLink>
            : <></>
            }
            
            <Search />
            {auth.isAuthenticated 
                ? 
                <div className='auth-nav'>
                    <NavLink to='/auth/logout' className='nav-link' onClick={logoutHandler}>Logout</NavLink>
                </div>
                : 
                <div className='auth-nav'>
                    <NavLink to='/auth/register' className='nav-link'>Register</NavLink>
                    <NavLink to='/auth/login' className='nav-link'>Log In</NavLink>
                </div>
            }
        </header>
    )
}

export default Navbar;
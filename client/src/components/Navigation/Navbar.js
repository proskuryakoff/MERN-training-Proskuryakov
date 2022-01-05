import React from 'react';
import { useDispatch } from 'react-redux';
import Search from '../Search/Search'
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { logout } from '../../actions/auth';
    
const Navbar = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async (event) => {
        try{
          dispatch(logout(navigate));
        } catch (err){
          throw err;
          console.log(err);
        }
      }

    return(
        <header className='Navbar'>
            <NavLink to="/" className='nav-link'>Home</NavLink>
            <NavLink to="/create" className='nav-link'>Create Post</NavLink>
            <Search />
            <div className='auth-nav'>
                <NavLink to='/auth/logout' onClick={logoutHandler} className='nav-link'>Logout</NavLink>
                <NavLink to='/auth/register' className='nav-link'>Authenticate</NavLink>
            </div>

        </header>
    )
}

export default Navbar;
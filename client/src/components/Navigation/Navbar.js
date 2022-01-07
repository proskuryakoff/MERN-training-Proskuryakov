import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../Search/Search'
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { logout } from '../../actions/auth';
    
const Navbar = (props) => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth)
    const isAuthenticated = !!authState.token;

    const logoutHandler = async (event) => {
        try{
          dispatch(logout());
        } catch (err){
          console.log(err);
          throw err;
        }
      }

    return(
        <header className='Navbar'>
            <NavLink to="/" className='nav-link'>Home</NavLink>
            <NavLink to="/create" className='nav-link'>Create Post</NavLink>
            <Search />
            

            {isAuthenticated 
            ? <div className='auth-nav'>
                <NavLink to="#" className='nav-link'>{authState.username}</NavLink>
                <NavLink to='/auth/logout' onClick={logoutHandler} className='nav-link'>Logout</NavLink>
              </div>
            : <div className='auth-nav'>
                <NavLink to='/auth/register' className='nav-link'>Authenticate</NavLink>
              </div>
            }

        </header>
    )
}

export default Navbar;
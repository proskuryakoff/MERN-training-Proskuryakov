import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Form from '../../components/Form/Form';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../actions/auth';
import { updateObject } from '../../utils/utility'
import './AuthPage.css';

const AuthPage = () => {
  const authState = useSelector((state) => state.auth);
  const [form,setForm] = useState({
    email: '',
    password: '',
    username: ''
});
const [isSignup, setIsSignup] = useState(true);
const dispatch = useDispatch();

const changeHandler = event => {
  const updatedForm = updateObject(form, {[event.target.name]: event.target.value})
  setForm(updatedForm)
}

const submitHandler = event => {
  event.preventDefault();
  dispatch(actions.auth({...form}, isSignup))
};

const switchAuthModeHandler = () => {
  setIsSignup(!isSignup);
};

if (authState.loading) {
  return (
    <Loader />
  )
}

  return (
    <Form title={isSignup ? 'Register an Account' : 'Log In'} onSubmit={submitHandler}>
        <Input placeholder='Your email' 
            className='default-input'
            id='email'
            name='email'
             type='text'
            onChange={changeHandler}
        />
        <Input placeholder='Your password' 
            className='default-input'
            id='password'
            name='password'
            type='password'
            onChange={changeHandler}
        />
        {isSignup 
        ? <Input placeholder='Your username' 
                className='default-input'
                id='username'
                name='username'
                type='username'
                onChange={changeHandler}
            />
        : <></>
        }
        <div className='card-action'>
            {isSignup 
            ? <Button type='submit' className='Button'>Registration</Button> 
            : <Button type='submit' className='Button'>Log In</Button>}
        </div>
        {isSignup
        ? <div>Have an account already? <NavLink onClick={switchAuthModeHandler} to='/auth/login'>Sign In</NavLink></div>
        : <div>Don't have an account? <NavLink onClick={switchAuthModeHandler} to='/auth/register'>Register</NavLink></div>
        }
        </Form>
  );
}

export default AuthPage;

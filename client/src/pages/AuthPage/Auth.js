import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Form from '../../components/Form/Form';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../actions/auth';
import { updateObject } from '../../utils/utility'
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
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
  // navigate('/');
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
    <Form title={isSignup ? 'Register an Account' : 'Log In'}>
            <div className='form-field'>
                <div className='input-field'>
                    <label htmlFor='email'>Email</label>
                    <Input placeholder='Your email' 
                        className='default-input'
                        id='email'
                        name='email'
                        type='text'
                        onChange={changeHandler}
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <Input placeholder='Your password' 
                        className='default-input'
                        id='password'
                        name='password'
                        type='password'
                        onChange={changeHandler}
                    />
                </div>
                {isSignup 
                ? <div className='input-field'>
                    <label htmlFor='username'>Username</label>
                    <Input placeholder='Your username' 
                        className='default-input'
                        id='username'
                        name='username'
                        type='username'
                        onChange={changeHandler}
                    />
                </div> 
                : <></>
                }
            </div>
            <div className='card-action'>
                {isSignup 
                ? <Button onClick= {submitHandler} className='Button'>Registration</Button> 
                : <Button onClick= {submitHandler} className='Button'>Log In</Button>}
            </div>
            {isSignup
            ? <div>Have an account already? <NavLink onClick={switchAuthModeHandler} to='/auth/login'>Sign In</NavLink></div>
            : <div>Don't have an account? <NavLink onClick={switchAuthModeHandler} to='/auth/register'>Register</NavLink></div>
            }
        </Form>
  );
}

export default AuthPage;

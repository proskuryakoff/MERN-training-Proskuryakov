import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Form from '../../components/Form/Form';
import { login, register } from '../../actions/auth';
import { LOGIN_ROUTE } from '../../utils/Consts';
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  console.log(location)
  const [form,setForm] = useState({
    email: '',
    password: '',
    username: ''
});
const dispatch = useDispatch();

const changeHandler = event => {
  setForm({...form, [event.target.name]: event.target.value})
}

const registerHandler = async (event) => {
  try{
    dispatch(register(form, navigate));
  } catch (err){
    console.log(err);
    throw err;
  }
}

const loginHandler = async (event) => {
  try{
    dispatch(login(form, navigate));
  } catch (err){
    console.log(err);
    throw err;
  }
}


  return (
    <Form title={!isLogin ? 'Register an Account' : 'Log In'}>
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
                {!isLogin 
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
                {!isLogin 
                ? <Button onClick= {registerHandler} className='Button'>Registration</Button> 
                : <Button onClick= {loginHandler} className='Button'>Log In</Button>}
            </div>
            {!isLogin 
            ? <div>Have an account already? <NavLink to='/auth/login'>Sign In</NavLink></div>
            : <div>Don't have an account? <NavLink to='/auth/register'>Register</NavLink></div>
            }
        </Form>
  );
}

export default AuthPage;

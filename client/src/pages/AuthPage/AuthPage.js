import React, {useContext, useState, useEffect} from 'react';
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Modal from '../../components/Modal/Modal';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './AuthPage.css';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, request, err} = useHttp();
    const [form,setForm] = useState({
        email: '',
        password: ''
    });

    // useEffect(() => {

    // }, [err])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async() => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data)
        }
        catch(err){

        }
    }
    const loginHandler = async() => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log(data);
            auth.login(data.token, data.userId);
        }
        catch(err){

        }
    }

    return (
        <div className='auth-form'>
            <h1>Auth</h1>
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
            </div>
            <div className='card-action'>
                <Button disabled={loading} className='Button'>Log in</Button>
                <Button onClick={registerHandler} disabled={loading} className='Button'>Registration</Button>
            </div>
        </div>
    )
}
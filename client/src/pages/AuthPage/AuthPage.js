import React from 'react';
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import './AuthPage.css';

export const AuthPage = () => {
    return (
        <div className='auth-form'>
            <h1>Auth</h1>
            <div>
                <div className='input-field'>
                    <label htmlFor='email'>Email</label>
                    <Input placeholder='Your email' 
                        id='email'
                        name='email'
                        type='text'
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <Input placeholder='Your password' 
                        id='password'
                        name='password'
                        type='password'
                    />
                </div>
            </div>
            <div className='card-action'>
                <Button>Log in</Button>
                <Button>Registration</Button>
            </div>
        </div>
    )
}
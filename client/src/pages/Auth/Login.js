import React, {useContext, useState} from 'react';
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Form from '../../components/Form/Form'
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './AuthPage.css';

export const LoginPage = () => {
    const auth = useContext(AuthContext);
    const {loading, request} = useHttp();
    const [form,setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async() => {
        try{
            const data = await request('/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    return (
        <Form title='Log In'>
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
                <Button onClick={loginHandler} disabled={loading}  className='Button'>Log in</Button>
            </div>
        </Form>
    )
}
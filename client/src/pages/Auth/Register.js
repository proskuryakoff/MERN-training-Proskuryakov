import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Form from '../../components/Form/Form';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './AuthPage.css';

export const RegisterPage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [form,setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async() => {
        try{
            const data = await request('http://localhost:4000/auth/register', 'POST', {...form})
            console.log(data)
            navigate('/', {replace: true})
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

    return (
        <Form title='Register an Account'>
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
                <div className='input-field'>
                    <label htmlFor='username'>Username</label>
                    <Input placeholder='Your username' 
                        className='default-input'
                        id='username'
                        name='username'
                        type='username'
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <div className='card-action'>
                <Button onClick={registerHandler} disabled={loading} className='Button'>Registration</Button>
            </div>
        </Form>
    )
}
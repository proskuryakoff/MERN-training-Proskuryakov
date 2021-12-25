import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth/AuthPage.css';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useHttp } from '../../hooks/http.hook';

export const CreatePage = () => {
    const navigate = useNavigate()
    const {loading, request, error, clearError} = useHttp();
    const [form,setForm] = useState({
        title: '',
        Content: ''
    });
    
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const createPostHandler = async() => {
        try{
            const data = await request('/', 'POST', {...form})
            console.log(data)
            navigate('/', {replace: true})
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
    return (
        <Form title='Create a Post'>
            <div className='form-field'>
                <div className='input-field'>
                    <label htmlFor='title'>Title</label>
                    <Input placeholder='Title' 
                        className='default-input'
                        id='title'
                        name='title'
                        type='text'
                        onChange={changeHandler}
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor='content'>Content</label>
                    <Input placeholder='Content' 
                        className='default-input'
                        id='content'
                        name='content'
                        type='text'
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <div className='card-action'>
                <Button onClick={createPostHandler} disabled={loading} className='Button'>Create</Button>
            </div>
        </Form>
    )
}
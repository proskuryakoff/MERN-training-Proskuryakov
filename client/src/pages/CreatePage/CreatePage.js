import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { createPost } from '../../actions/posts';
import '../AuthPage/AuthPage.css';

const CreatePage = () => {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    category: '',
    title: '',
    contentLink: '',
    description: ''
  });
  const dispatch = useDispatch();

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const createPostHandler = async() => {
    try{
      dispatch(createPost(form, navigate));
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
                    <label htmlFor='category'>Category</label>
                    <Input placeholder='Category' 
                        className='selector'
                        id='category'
                        name='category'
                        type='select'
                        onChange={changeHandler}
                    />
                </div>
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
                    <label htmlFor='contentLink'>Content</label>
                    <Input placeholder='Content Link' 
                        className='default-input'
                        id='contentLink'
                        name='contentLink'
                        type='file'
                        onChange={changeHandler}
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor='description'>Content</label>
                    <Input placeholder='Description' 
                        className='default-input'
                        id='description'
                        name='description'
                        type='text'
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <div className='card-action'>
                <Button onClick={createPostHandler} className='Button'>Create</Button>
            </div>
        </Form>
  );
}

export default CreatePage;

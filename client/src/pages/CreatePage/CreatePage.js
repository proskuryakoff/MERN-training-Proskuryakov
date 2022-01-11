import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { createPost } from '../../actions/posts';
import '../AuthPage/AuthPage.css';

const CreatePage = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth)
  const [form,setForm] = useState({
    category: '',
    title: '',
    contentLink: '',
    description: '', 
    content: null
  });
  
  const dispatch = useDispatch();

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const fileChangeHandler = event => {
    setForm({...form, [event.target.name]: event.target.files[0]})
  }

  const createPostHandler = async(event) => {
    event.preventDefault()
    try{
      const headers = {
        'Authorization': 'Bearer ' + authState.token
      }
      const formData = new FormData();
      formData.append('category', form.category)
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('content', form.content)
      dispatch(createPost(formData, navigate, headers));
    }
    catch(err){
        console.log(err);
        throw err;
    }
  }

  return (
    <Form title='Create a Post' onSubmit={createPostHandler} encType='multipart/form-data'>
        <Input placeholder='Category' 
            className='selector'
            id='category'
            name='category'
            type='select'
            htmlFor='category'
            onChange={changeHandler}
        />
        <Input placeholder='Title' 
            className='default-input'
            id='title'
            name='title'
            type='text'
            htmlFor='title'
            onChange={changeHandler}
        />
        <Input placeholder='Content' 
            className='default-input'
            id='content'
            name='content'
            type='file'
            htmlFor='content'
            onChange={fileChangeHandler}
        />
        <Input placeholder='Description' 
            className='default-input'
            id='description'
            name='description'
            type='text'
            htmlFor='description'
            onChange={changeHandler}
        />

        <div className='card-action'>
            <Button type='submit' className='Button'>Create</Button>
        </div>
    </Form>
  );
}

export default CreatePage;

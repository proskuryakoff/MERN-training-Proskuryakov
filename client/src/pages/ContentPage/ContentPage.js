import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { getContent, loadVideo, editPost, deletePost, likePost, leaveComment, incrementViews} from '../../actions/posts'
import ReactPlayer from 'react-player'
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input'
import TextArea from '../../components/TextArea/TextArea';
import Form from '../../components/Form/Form';
import { FormatDate } from '../../utils/FormatDate';
import './ContentPage.css'
 
const ContentPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [commentForm,setCommentForm] = useState({
    comment: ''
  });
  const [form,setForm] = useState({
    category: '',
    title: '',
    description: '', 
    content: null
  });
  const [isEditing, setEdit] = useState(false)
  const postId = useParams().id;
  useEffect(() => {
    dispatch(getContent('/content/' + postId + '/get'))
    dispatch(loadVideo('/content/' + postId))
  }, [dispatch, postId])
  const postState = useSelector((state) => state.posts);
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = !!authState.token;
  const contentPath = 'http://localhost:4000/content/' + postId

  let views = [];

  if (localStorage.getItem('views') !== null) {
    views = JSON.parse(localStorage.getItem('views'))
  }

  const commentChangeHandler = event => {
    setCommentForm({...commentForm, [event.target.name]: event.target.value})
  }
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }
  const fileChangeHandler = event => {
    setForm({...form, [event.target.name]: event.target.files[0]})
  }


  const startHandler = () => {
    if(!views.includes(postState.posts.post._id)){
      views.push(postState.posts.post._id)
      localStorage.setItem('views', JSON.stringify(views))
      dispatch(incrementViews('/content/' + postId))
    }
  }

  const startEditHandler = () => {
    setEdit(true)
    setForm({
      category: postState.posts.post.category,
      title: postState.posts.post.title,
      description: postState.posts.post.description, 
      content: null
    })
  }
  const closeEditWindow = () => {
    setEdit(false)
  }
  const editHandler = (event) => {
    event.preventDefault()
    try{
      const headers = {
        'Authorization': 'Bearer ' + authState.token
      }
      const url = '/content/' + postId
      const formData = new FormData();
      formData.append('category', form.category)
      formData.append('title', form.title)
      formData.append('description', form.description)
      if (form.content === null) {
        formData.append('contentLink', postState.posts.post.contentLink)
        formData.append('type', postState.posts.post.type)
      } else {
        formData.append('content', form.content)
      }
      dispatch(editPost(url, formData, headers, navigate));
    }
    catch(err){
        console.log(err);
        throw err;
    }
  }

  const deleteHandler = (event) => {
    event.preventDefault()
    const headers = {
      'Authorization': 'Bearer ' + authState.token
    }
    const url = '/content/' + postId
    dispatch(deletePost(url, headers, navigate));
  }

  const likeHandler = (event) => {
    event.preventDefault()
    const headers = {
      'Authorization': 'Bearer ' + authState.token
    }
    const url = '/content/' + postId + '/like'
    dispatch(likePost(url, headers))
  }

  const commentHandler = (event) => {
    event.preventDefault()
    const headers = {
      'Authorization': 'Bearer ' + authState.token
    }
    const url = '/content/' + postId + '/comment'
    dispatch(leaveComment(url, {...commentForm}, headers))
  }

  if (postState.loading) {
    return (
      <Loader />
    )
  }
  if (isEditing) {
    return (
    <Form title='Update the Post' onSubmit={editHandler} encType='multipart/form-data'>
        <Input placeholder='Category' 
            className='selector'
            id='category'
            name='category'
            type='select'
            htmlFor='category'
            value={form.category}
            onChange={changeHandler}
        />
        <Input placeholder='Title' 
            className='default-input'
            id='title'
            name='title'
            type='text'
            htmlFor='title'
            value={form.title}
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
            value={form.description}
            onChange={changeHandler}
        />
        <div className='card-action'>
            <Button type='submit' className='Button'>Update</Button>
            <Button onClick={closeEditWindow} className='Button'>Close</Button>
        </div>
    </Form>
    )
  }

  return (
    <div>
      {isAuthenticated && authState.roles.includes("ADMIN") 
      ? 
        <div className='content-admin-panel'>
            <Button
            className='Button'
            onClick={startEditHandler} 
            >Edit</Button>
            <Button
            className='Button'
            onClick={deleteHandler}
            >Delete</Button>
        </div>
      :
        <></>
      }
       {isAuthenticated || views.length < 10
       ? <ReactPlayer 
          url={contentPath}
          width={ postState.posts.post.type === 'video/mp4' ? '100%' : '50%'}
          height={postState.posts.post.type === 'video/mp4' ? '' : '50%'}
          controls = {true}
          controlsList="nodownload"
          onStart = {startHandler}
       />
       : <p>You have viewed/listened more than 10 videos/audios</p>}
        <h1 className='content-title'>{postState.posts.post.title}</h1>
        <div className='info-field'>
          <div>
            <div>Published: {FormatDate(postState.posts.post.created)}</div>
            <div>Viewed: {postState.posts.post.viewed}</div>
          </div>
          <Button 
          className='like-button'
          disabled={!isAuthenticated}
          onClick={likeHandler}
          liked={false}
          />
        </div>
        
        <div className='description-field'>{postState.posts.post.description}</div>

        <div className='comments-field'>{postState.posts.post.comments}</div>

        <div className='comments-action-field'>
          <TextArea className='textarea-default'
          placeholder='Your comment...'
          id='comment'
          name='comment'
          onChange={commentChangeHandler}
          rows={2}/>
          <Button className='Button'
          disabled={!isAuthenticated || commentForm.comments === ""}
          onClick={commentHandler}
          >Leave a comment</Button>
        </div>
        
    </div>
  );
}

export default ContentPage;

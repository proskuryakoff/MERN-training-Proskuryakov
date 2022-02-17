import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { getContent, loadVideo, editPost, deletePost, likePost, leaveComment, incrementViews} from '../../actions/posts'
import { getPlaylists } from '../../actions/playlists'
import ReactPlayer from 'react-player'
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input'
import TextArea from '../../components/TextArea/TextArea';
import Modal from '../../components/Modal/Modal';
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
  const [modalActive, setModalActive] = useState(false)
  const postId = useParams().id;
  useEffect(() => {
    dispatch(getContent('/content/' + postId))
    dispatch(loadVideo('/content/' + postId + '/media'))
  }, [postId, dispatch])
  const postState = useSelector((state) => state.posts);
  const authState = useSelector((state) => state.auth);
  const playlistsState = useSelector((state) => state.playlists);
  const isAuthenticated = !!authState.token;
  const contentPath = 'http://localhost:4000/content/' + postId + '/media'

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
    if(!views.includes(postState.posts._id)){
      views.push(postState.posts._id)
      localStorage.setItem('views', JSON.stringify(views))
      dispatch(incrementViews('/content/' + postId))
    }
  }

  const startEditHandler = () => {
    setEdit(true)
    setForm({
      category: postState.posts.category,
      title: postState.posts.title,
      description: postState.posts.description, 
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
        formData.append('contentLink', postState.posts.contentLink)
        formData.append('type', postState.posts.type)
      } else {
        formData.append('content', form.content)
      }
      dispatch(editPost(url, formData, headers));
    }
    catch(err){
        console.log(err);
        throw err;
    }
    setEdit(false);
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
    dispatch(likePost(postId, headers))
  }

  const commentHandler = (event) => {
    event.preventDefault()
    const headers = {
      'Authorization': 'Bearer ' + authState.token
    }
    dispatch(leaveComment(postId, {...commentForm}, headers))
  }
  const modalStateHandler = () => {
    const headers = {
      'Authorization': 'Bearer ' + authState.token
    }
    dispatch(getPlaylists(headers))
    setModalActive(true)
  }

  const liked = postState.posts.liked

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
      <Modal active={modalActive} setActive={setModalActive}>
          <h3 className='modal-title'>Add to playlists</h3>
          {playlistsState.playlists 
          ? 
          playlistsState.playlists.map((playlist) => {
            return (
              <div className='modal-playlist' key={playlist._id}>
                  <Input type='checkbox' value={playlist._id}/>
                  <div>{playlist.name}</div>
              </div>
            )
          })
          : 
          <div>You have no playlists yet</div>}
          <Button className='Button'>Add to Playlists</Button>
      </Modal>
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
          width={ postState.posts.type === 'video/mp4' ? '60%' : '50%'}
          height={postState.posts.type === 'video/mp4' ? '' : '70px'}
          controls = {true}
          controlsList="nodownload"
          onStart = {startHandler}
       />
       : <p className='limit-notification'>You have viewed/listened more than 10 records</p>}
       <div className='content-header'>
          <h1 className='content-title'>{postState.posts.title}</h1>
          <Button
            className='Button'
            onClick={modalStateHandler}
          >+ Add to Playlist</Button>
       </div>
        
        <div className='info-field'>
          <div>
            <div>Published: {FormatDate(postState.posts.created)}</div>
            <div>Viewed: {postState.posts.viewed}</div>
          </div>
          <Button 
          className='like-button'
          disabled={!isAuthenticated}
          onClick={likeHandler}
          liked={liked ? liked.includes(authState.userId) : false}
          likeAmount={liked ? liked.length : 'Like'}
          />
        </div>
        
        <div className='description-field'>{postState.posts.description}</div>

        <div className='comments-field'>{!postState.posts.comments 
        ? 
          <Loader />
        : 
        postState.posts.comments.length === 0 
        ? 
          <p>There no comments yet</p> 
        :
        postState.posts.comments.map((comment) => {
          return(
            <div className='comment' key={comment._id}>
              <div className='comment-author' key={comment._id + '-auth'}>{comment.author.name}</div>
              <div className='comment-created' key={comment._id + '-time'}>{FormatDate(comment.created)}</div>
              <div className='comment-text' key={comment._id + '-text'}>{comment.text}</div>
            </div>
          )
        })
        }</div>

        <div className='comments-action-field'>
          <TextArea className='textarea-default'
          placeholder={isAuthenticated ? 'Your comment...' : "You cannot post comments until you are logged in"}
          id='comment'
          name='comment'
          onChange={commentChangeHandler}
          rows={2}
          disabled={!isAuthenticated}
          />
          <Button className='Button'
          disabled={!isAuthenticated || commentForm.comment === ''}
          onClick={commentHandler}
          >Leave a comment</Button>
        </div>
        
    </div>
  );
}

export default ContentPage;

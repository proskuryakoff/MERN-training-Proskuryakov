import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getContent, loadVideo } from '../../actions/posts'
import ReactPlayer from 'react-player'
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import TextArea from '../../components/TextArea/TextArea';
import { FormatDate } from '../../utils/FormatDate';
import './ContentPage.css'
 
const ContentPage = () => {
  const dispatch = useDispatch()
  const [form,setForm] = useState(null);
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

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const startHandler = () => {
    if(!views.includes(postState.posts._id)){
      views.push(postState.posts._id)
      localStorage.setItem('views', JSON.stringify(views))
    }
  }

  const likeHandler = () => {

  }

  if (postState.loading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
       {isAuthenticated || views.length < 10
       ? <ReactPlayer 
          url={contentPath}
          width={ postState.posts.type === 'video/mp4' ? '100%' : '50%'}
          height={postState.posts.type === 'video/mp4' ? '' : '50%'}
          controls = {true}
          controlsList="nodownload"
          onStart = {startHandler}
       />
       : <p>You have viewed/listened more than 10 videos/audios</p>}
        <h1 className='content-title'>{postState.posts.title}</h1>
        <div className='info-field'>
          <div>
            <div>Published: {FormatDate(postState.posts.created)}</div>
            <div>Viewed: {postState.posts.viewed}</div>
          </div>
          <Button 
          className='like-button'
          disabled={!isAuthenticated}
          liked={true}
          />
        </div>
        
        <div className='description-field'>{postState.posts.description}</div>

        <div className='comments-field'>{postState.posts.comments}</div>

        <div className='comments-action-field'>
          <TextArea className='textarea-default'
          placeholder='Your comment...'
          id='comments'
          name='comments'
          onChange={changeHandler}
          rows={2}/>
          <Button className='Button'
          disabled={!isAuthenticated || form == null}>Leave a comment</Button>
        </div>
        
    </div>
  );
}

export default ContentPage;

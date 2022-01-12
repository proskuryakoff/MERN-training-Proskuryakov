import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getContent, loadVideo } from '../../actions/posts'
import ReactPlayer from 'react-player'
import Loader from '../../components/Loader/Loader';
 
const ContentPage = () => {
  const dispatch = useDispatch()
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
  const startHandler = () => {
    if(!views.includes(postState.posts._id)){
      views.push(postState.posts._id)
      localStorage.setItem('views', JSON.stringify(views))
    }
  }

  if (postState.loading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
        <h1>{postState.posts.title}</h1>
        <div>{postState.posts.description}</div>
       {isAuthenticated || views.length < 10
       ? <ReactPlayer 
          url={contentPath}
          width='50%'
          controls = {true}
          onStart = {startHandler}
       />
       : <p>You have viewed/listened more than 10 videos/audios</p>}
        <div>{postState.posts.created}</div>
    </div>
  );
}

export default ContentPage;

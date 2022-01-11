import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getContent } from '../../actions/posts'
import ReactPlayer from 'react-player'
import Loader from '../../components/Loader/Loader';
 
const ContentPage = () => {
  const dispatch = useDispatch()
  const postId = useParams().id;
  useEffect(() => {
    dispatch(getContent('/content/' + postId))
  }, [dispatch, postId])
  const postState = useSelector((state) => state.posts);
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = !!authState.token;
  const contentPath = process.env.PUBLIC_URL + postState.posts.contentLink

  let unauthorizedViews = [];

  if (localStorage.getItem('unauthorizedViews') !== null) {
    unauthorizedViews = JSON.parse(localStorage.getItem('unauthorizedViews'))
  }
  const startHandler = () => {
    if(!unauthorizedViews.includes(postState.posts._id)){
      unauthorizedViews.push(postState.posts._id)
      localStorage.setItem('unauthorizedViews', JSON.stringify(unauthorizedViews))
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
       {isAuthenticated || unauthorizedViews.length < 10
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

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getContent } from '../../actions/posts'
import Loader from '../../components/Loader/Loader';
 
const ContentPage = () => {
  const dispatch = useDispatch()
  const postId = useParams().id;
  useEffect(() => {
    dispatch(getContent('/content/' + postId))
  }, [dispatch, postId])
  const postState = useSelector((state) => state.posts);

  if (postState.loading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
        <h1>{postState.posts.title}</h1>
        <div>{postState.posts.content}</div>
    </div>
  );
}

export default ContentPage;

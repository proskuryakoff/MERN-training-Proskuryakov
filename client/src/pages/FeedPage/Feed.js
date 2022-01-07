import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts'
import { PostsList } from '../../components/PostsList/PostsList';
import Loader from '../../components/Loader/Loader';
 
const FeedPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  const postsState = useSelector((state) => state.posts);

  if (postsState.loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <PostsList posts={postsState.posts} />
    </>
  );
}

export default FeedPage;

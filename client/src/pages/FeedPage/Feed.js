import React from 'react';
import { useSelector } from 'react-redux';
import { PostsList } from '../../components/PostsList/PostsList';
 
const FeedPage = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <>
      <PostsList posts={posts} />
    </>
  );
}

export default FeedPage;

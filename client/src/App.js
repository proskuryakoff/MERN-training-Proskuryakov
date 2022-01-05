import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter/AppRouter';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './actions/posts'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

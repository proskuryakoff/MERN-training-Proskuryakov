import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter/AppRouter';
import { useDispatch} from 'react-redux';
import { authCheckState } from './actions/auth';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authCheckState())
  }, [dispatch])
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

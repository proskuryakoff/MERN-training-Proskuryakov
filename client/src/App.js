import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import { useRoutes } from './Routes'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

function App() {
  const {token, login, logout, setAutoLogout, userId} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  useEffect(() => {
    const expiryDate = localStorage.getItem('expiryDate');
    if (!expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logout();
      return;
    }
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setAutoLogout(remainingMilliseconds);
  }, [])
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        <div className="App">
          <Layout isAuthenticated={isAuthenticated}>
            {routes}
          </Layout>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
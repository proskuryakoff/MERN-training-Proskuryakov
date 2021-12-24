import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import { useRoutes } from './Routes'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

function App() {
  const {token, login, logout, userId} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        <div className="App">
          <Layout>
            {routes}
          </Layout>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
    
  );
}

export default App;

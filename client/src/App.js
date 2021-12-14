import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Button from "./components/Button/Button";
import { useRoutes } from './Routes'

function App() {
  const routes = useRoutes(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <h1>HelloWorld!</h1>
          {routes}
          <Button>Hello</Button>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;

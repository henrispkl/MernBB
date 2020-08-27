import React, { createContext, useReducer, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Board from './pages/Board/Board';
import Subcategory from './pages/Subcategory/Subcategory';
import Topic from './pages/Topic/Topic';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import reducer from './utils/reducer';

// Auth context
export const AuthContext = createContext();
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Check if there's a token on localStorage and authenticate with it
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      const token = JSON.parse(localStorage.getItem('token'));
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Header />

            <Switch>
              <Route path="/" exact component={Board} />
              <Route path="/subcategory" component={Subcategory} />
              <Route path="/topic" component={Topic} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>

            <Footer />
          </Layout>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;

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

// Auth context
export const AuthContext = createContext();
const initialState = { user: null, token: null, isAuthenticated: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case 'LOGOUT':
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Check if there's a token on localStorage
  useEffect(() => {
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

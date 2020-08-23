import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Board from './pages/Board/Board';
import Subcategory from './pages/Subcategory/Subcategory';
import Topic from './pages/Topic/Topic';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Layout>
        <Header />

        <Switch>
          <Route path="/" exact component={Board} />
          <Route path="/subcategory" component={Subcategory} />
          <Route path="/topic" component={Topic} />
        </Switch>

        <Footer />
      </Layout>
    </div>
  </BrowserRouter>
);

export default App;

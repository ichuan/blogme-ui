import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Article from '../Article';
import NewArticle from '../Article/New';
import EditArticle from '../Article/Edit';
import ManageArticle from '../Article/Manage';
import ManageUser from '../User';
import Api from '../../utils/api';
import useGlobal from '../../utils/hooks';

import './style.css';

export default function App() {
  const [globalState, globalActions] = useGlobal();
  useEffect(() => {
    Api.get('/config').then(r => globalActions.setConfig(r));
    if (Api.hasToken() && !globalState.user) {
      Api.post('/users/test-token').then(r => {
        if (r.username) {
          globalActions.setUser(r);
        }
      });
    }
  }, [globalActions]);
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/edit/:articleId">
            <EditArticle />
          </Route>
          <Route exact path="/new">
            <NewArticle />
          </Route>
          <Route exact path="/admin/article">
            <ManageArticle />
          </Route>
          <Route exact path="/admin/user">
            <ManageUser />
          </Route>
          <Route exact path="/p/:articleId">
            <div className="container">
              <Article />
            </div>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Article from '../Article';
import Api from '../../utils/api';
import useGlobal from '../../utils/hooks';

import './style.css';

export default function App() {
  const globalActions = useGlobal()[1];
  useEffect(() => {
    Api.get('/config').then(r => globalActions.setConfig(r));
    if (Api.hasToken()) {
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

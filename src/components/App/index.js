import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Article from '../Article';
import Api from '../../utils/api';
import useGlobal from '../../utils/hooks';

export default function App() {
  const globalActions = useGlobal()[1];
  useEffect(() => {
    Api.get('/config').then(r => globalActions.setConfig(r));
    if (Api.getToken()) {
      Api.post('/users/test-token').then(r => {
        if (r.username) {
          globalActions.setUser(r);
        }
      });
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/p/:articleId">
            <Article />
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

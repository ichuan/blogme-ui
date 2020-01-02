import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Article from '../Article';
import Api from '../../utils/api';
import useGlobal from '../../utils/hooks';
import './style.css';

const NewArticle = lazy(() => import('../Article/New')),
  EditArticle = lazy(() => import('../Article/Edit')),
  ManageArticle = lazy(() => import('../Article/Manage')),
  ManageUser = lazy(() => import('../User'));

export default () => {
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
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/edit/:articleId" component={EditArticle} />
            <Route exact path="/new" component={NewArticle} />
            <Route exact path="/admin/article" component={ManageArticle} />
            <Route exact path="/admin/user" component={ManageUser} />
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
      </Suspense>
    </Router>
  );
};

import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Article from '../Article';
import Api from '../../utils/api';
import useGlobal from '../../utils/hooks';
import Loader from '../../utils/loader';
import './style.css';

const NewArticle = lazy(() => import('../Article/New')),
  EditArticle = lazy(() => import('../Article/Edit')),
  ManageArticle = lazy(() => import('../Article/Manage')),
  ManageUser = lazy(() => import('../User')),
  ManageSite = lazy(() => import('../Site')),
  Archive = lazy(() => import('../Archive'));

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
      <div className="App">
        <Header />
        <Suspense
          fallback={
            <div className="container">
              <Loader />
            </div>
          }
        >
          <Switch>
            <Route exact path="/edit/:articleId" component={EditArticle} />
            <Route exact path="/new" component={NewArticle} />
            <Route exact path="/admin/article" component={ManageArticle} />
            <Route exact path="/admin/user" component={ManageUser} />
            <Route exact path="/admin/site" component={ManageSite} />
            <Route exact path="/archive" component={Archive} />
            <Route exact path="/p/:articleId">
              <div className="container">
                <Article />
              </div>
            </Route>
            <Route exact path={['/_/:encodedParams', '/']}>
              <Home />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
};

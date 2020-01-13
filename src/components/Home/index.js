import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useGlobal from '../../utils/hooks';
import Article from '../Article';
import Pager from '../Pager';
import Api from '../../utils/api';
import Loader from '../../utils/loader';

export default () => {
  const globalState = useGlobal()[0];
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const [ing, setIng] = useState(false);
  const { encodedParams } = useParams();
  const [params, setParams] = useState({});
  useEffect(() => {
    let _params = {};
    if (encodedParams) {
      try {
        _params = JSON.parse(window.atob(encodedParams));
      } catch (e) {}
    }
    setIng(true);
    setParams(_params);
    Api.get('/articles', _params)
      .then(r => setArticles(r))
      .finally(e => setIng(false));
  }, [encodedParams]);
  return (
    <div className="container">
      <Helmet>
        <title>{globalState.config['site.name'] || ''}</title>
      </Helmet>
      {ing ? <Loader /> : articles.map(i => <Article item={i} key={i.id} />)}
      <Pager
        items={articles}
        curParams={params}
        onClick={p => history.push(`/_/${window.btoa(JSON.stringify(p))}`)}
      />
    </div>
  );
};

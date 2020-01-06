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
  let params = {};
  try {
    params = JSON.parse(window.atob(encodedParams));
  } catch (e) {}
  useEffect(() => {
    setIng(true);
    Api.get('/articles', params)
      .then(r => setArticles(r))
      .finally(e => setIng(false));
  }, [params.starting_after, params.ending_before, params.limit]);
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

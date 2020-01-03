import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useGlobal from '../../utils/hooks';
import Article from '../Article';
import Pager from '../Pager';
import Api from '../../utils/api';

export default () => {
  const globalState = useGlobal()[0];
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const { encodedParams } = useParams();
  let params = {};
  try {
    params = JSON.parse(window.atob(encodedParams));
  } catch (e) {}
  useEffect(() => {
    Api.get('/articles', params).then(r => setArticles(r));
  }, [params.starting_after, params.ending_before, params.limit]);
  return (
    <div className="container">
      <Helmet>
        <title>{`首页 - ${globalState.config['site.name'] || ''}`}</title>
      </Helmet>
      {articles.map(i => (
        <Article item={i} key={i.id} />
      ))}
      <Pager
        items={articles}
        curParams={params}
        onClick={p => history.push(`/_/${window.btoa(JSON.stringify(p))}`)}
      />
    </div>
  );
};

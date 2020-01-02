import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useGlobal from '../../utils/hooks';
import Article from '../Article';
import Pager from '../Pager';
import Api from '../../utils/api';

export default () => {
  const globalState = useGlobal()[0];
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({});
  useEffect(() => {
    Api.get('/articles', params).then(r => setArticles(r));
  }, [params]);
  return (
    <div className="container">
      <Helmet>
        <title>{`首页 - ${globalState.config['site.name'] || ''}`}</title>
      </Helmet>
      {articles.map(i => (
        <Article item={i} key={i.id} />
      ))}
      <Pager items={articles} curParams={params} onClick={p => setParams(p)} />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Api from '../../utils/api';
import Pager from '../Pager';
import Loader from '../../utils/loader';

import './style.css';

const Box = ({ item }) => {
  return (
    <Link to={`/p/${item.id}`}>
      <div className="box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{item.display_name || item.username}</strong>{' '}
                <small>{item.created_at.replace('T', ' ')}</small>
                <br />
                {item.subject}
              </p>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
};

export default () => {
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({ limit: 100 });
  const [ing, setIng] = useState(false);
  useEffect(() => {
    setIng(true);
    Api.get('/articles/archive', params)
      .then(r => setArticles(r))
      .finally(e => setIng(false));
  }, [params]);
  return (
    <div className="container archive">
      <h1 className="title">文章索引</h1>
      <Helmet>
        <title>文章索引</title>
      </Helmet>
      {ing ? <Loader /> : articles.map(i => <Box item={i} key={i.id} />)}
      <Pager items={articles} curParams={params} onClick={p => setParams(p)} />
    </div>
  );
};

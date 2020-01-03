import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Api from '../../utils/api';
import useGlobal from '../../utils/hooks';
import Pager from '../Pager';

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
  const globalState = useGlobal()[0];
  useEffect(() => {
    globalState.user &&
      Api.get('/articles/archive', params).then(r => setArticles(r));
  }, [params, globalState.user]);
  return (
    <div className="container archive">
      <h1 className="title">文章索引</h1>
      <Helmet>
        <title>文章索引</title>
      </Helmet>
      {articles.map(i => (
        <Box item={i} key={i.id} />
      ))}
      <Pager items={articles} curParams={params} onClick={p => setParams(p)} />
    </div>
  );
};

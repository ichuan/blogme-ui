import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Octicon, { Clock } from '@primer/octicons-react';
import useGlobal from '../../utils/hooks';
import Api from '../../utils/api';

import './style.css';

export default function({ item }) {
  let [article, setArticle] = useState(item || {});
  const globalState = useGlobal()[0];
  let standaloneMode = false;

  if (!item) {
    standaloneMode = true;
    const { articleId } = useParams();
    useEffect(() => {
      Api.get(`/articles/${articleId}`).then(r => setArticle(r));
    }, [articleId]);
  }
  return (
    <div className="article">
      {standaloneMode && article.id && (
        <Helmet>
          <title>{`${article.subject} - ${globalState.config['site.name']}`}</title>
        </Helmet>
      )}
      <h1 className="title">
        {standaloneMode ? (
          article.subject
        ) : (
          <Link to={`/p/${article.id}`}>{article.subject}</Link>
        )}
      </h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: article.content || '' }}
      ></div>
      <ul className="meta">
        <li>
          <Octicon icon={Clock} /> {article.created_at}
        </li>
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Octicon, { Clock, Person, Pencil } from '@primer/octicons-react';
import useGlobal from '../../utils/hooks';
import Api from '../../utils/api';
import Loader from '../../utils/loader';
import Highlight from '../../utils/highlight';

import './style.css';
import 'trix/dist/trix.css';

const highlight = content => {
  return content.replace(/<pre>([\s\S]+?)<\/pre>/gm, (whole, code) => {
    const decoded = code
      .replace(/^<code>|<\/code>$/g, '')
      .replace(/<br>/g, '\n')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    try {
      return `<pre class="hljs">${Highlight.auto(decoded)}</pre>`;
    } catch (e) {
      return whole;
    }
  });
};

export default ({ item }) => {
  let [article, setArticle] = useState(item || {});
  let [ready, setReady] = useState(item || false);
  const globalState = useGlobal()[0];
  let standaloneMode = false;
  let createdAt = article.created_at ? article.created_at.split('T')[0] : '-';

  if (!item) {
    standaloneMode = true;
    const { articleId } = useParams();
    useEffect(() => {
      Api.get(`/articles/${articleId}`)
        .then(r => setArticle(r))
        .finally(e => setReady(true));
    }, [articleId]);
  }
  return (
    <div className="article">
      {standaloneMode && article.id && (
        <Helmet>
          <title>{`${article.subject} - ${globalState.config['site.name']}`}</title>
        </Helmet>
      )}
      {!ready && <Loader />}
      <h1 className="title">
        {standaloneMode ? (
          article.subject
        ) : (
          <Link to={`/p/${article.id}`}>{article.subject}</Link>
        )}
      </h1>
      <ul className="meta">
        <li title={article.username}>
          <Octicon icon={Person} />
          {article.display_name || article.username}
        </li>
        <li title={article.created_at}>
          <Octicon icon={Clock} />
          {createdAt}
        </li>
        {globalState.user &&
          (globalState.user.id === article.user_id ||
            globalState.user.is_superuser) && (
            <li>
              <Link to={`/edit/${article.id}`}>
                <Octicon icon={Pencil} />
                编辑
              </Link>
            </li>
          )}
      </ul>
      <div
        className="content is-trix"
        dangerouslySetInnerHTML={{
          __html: highlight(article.content || ''),
        }}
      ></div>
    </div>
  );
};

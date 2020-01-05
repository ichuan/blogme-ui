import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewArticle from './New';
import Api from '../../utils/api';
import Loader from '../../utils/loader';

export default () => {
  const { articleId } = useParams();
  let [article, setArticle] = useState({});
  let [ready, setReady] = useState(false);
  useEffect(() => {
    Api.get(`/articles/${articleId}`)
      .then(r => setArticle(r))
      .finally(e => setReady(true));
  }, [articleId]);
  return ready ? (
    <NewArticle item={article} />
  ) : (
    <div className="container">
      <Loader />
    </div>
  );
};

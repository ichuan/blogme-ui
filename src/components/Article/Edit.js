import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewArticle from './New';
import Api from '../../utils/api';

export default () => {
  const { articleId } = useParams();
  let [article, setArticle] = useState({});
  useEffect(() => {
    Api.get(`/articles/${articleId}`).then(r => setArticle(r));
  }, [articleId]);
  return article.id ? <NewArticle item={article} /> : <div />;
};

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Api from '../../utils/api';
import Toast from '../../utils/toast';
import Pager from '../Pager';
import useGlobal from '../../utils/hooks';
import Loader from '../../utils/loader';

const deleteArticle = id => {
  return Api.delete(`/articles/${id}`);
};

const Row = ({ item, onDelete }) => {
  return (
    <tr>
      <td>
        <Link className="is-block" to={`/edit/${item.id}`}>
          {item.subject}
        </Link>
      </td>
      <td title={item.username}>{item.display_name}</td>
      <td>{item.created_at}</td>
      <td>
        <div className="buttons are-small">
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onDelete}
          >
            删除
          </button>
        </div>
      </td>
    </tr>
  );
};

export default () => {
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({ limit: 20 });
  const [ing, setIng] = useState(false);
  const globalState = useGlobal()[0];
  useEffect(() => {
    if (globalState.user) {
      setIng(true);
      Api.get('/articles/archive', params)
        .then(r => setArticles(r))
        .finally(e => setIng(false));
    }
  }, [params, globalState.user]);
  return (
    <div className="container">
      <Helmet>
        <title>管理文章</title>
      </Helmet>
      {ing && <Loader />}
      <div className="table-container">
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>标题</th>
              <th>作者</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(i => (
              <Row
                item={i}
                key={i.id}
                onDelete={() =>
                  window.confirm(`确定删除文章「${i.subject}」？`) &&
                  deleteArticle(i.id)
                    .then(() => {
                      setArticles(articles.filter(j => j.id !== i.id));
                    })
                    .catch(Toast.error)
                }
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pager items={articles} curParams={params} onClick={p => setParams(p)} />
    </div>
  );
};

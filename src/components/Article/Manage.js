import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../utils/api';
import Pager from '../Pager';

const Row = ({ item }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>
        <Link to={`/edit/${item.id}`}>{item.subject}</Link>
      </td>
      <td>{item.created_at}</td>
      <td title={item.username}>{item.display_name}</td>
      <td>
        <div className="buttons are-small">
          <button className="button is-danger is-light">删除</button>
        </div>
      </td>
    </tr>
  );
};

export default () => {
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({});
  useEffect(() => {
    Api.get('/articles/archive', params).then(r => setArticles(r));
  }, [params]);
  return (
    <div className="container admin">
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>时间</th>
            <th>作者</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(i => (
            <Row item={i} key={i.id} />
          ))}
        </tbody>
      </table>
      <Pager items={articles} curParams={params} onClick={p => setParams(p)} />
    </div>
  );
};

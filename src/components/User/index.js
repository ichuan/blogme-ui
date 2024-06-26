import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useGlobal from '../../utils/hooks';
import Api from '../../utils/api';
import Toast from '../../utils/toast';
import Pager from '../Pager';
import EditModal from './EditModal';
import Loader from '../../utils/loader';

const deleteUser = id => {
  return Api.delete(`/users/${id}`);
};

const upsertUser = user => {
  if (user.id) {
    const url = `/users/${user.id}`;
    delete user.id;
    return Api.put(url, user);
  }
  return Api.post('/users', user);
};

const Row = ({ item, onDelete, onEdit }) => {
  return (
    <tr>
      <td>
        <strong>{item.username}</strong>
      </td>
      <td>{item.display_name}</td>
      <td>{item.email || '-'}</td>
      <td>{item.is_superuser ? '是' : ''}</td>
      <td>{(item.last_login || '').split('T')[0]}</td>
      <td>{(item.date_joined || '').split('T')[0]}</td>
      <td>
        <div className="buttons are-small">
          <button
            type="button"
            className="button is-primary is-light"
            onClick={onEdit}
          >
            编辑
          </button>
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
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({ limit: 20 });
  const [modalActive, setModalActive] = useState(false);
  const [editingUser, setEditingUser] = useState();
  const [ing, setIng] = useState(false);
  const globalState = useGlobal()[0];
  useEffect(() => {
    if (globalState.user) {
      setIng(true);
      Api.get('/users', params)
        .then(r => setUsers(r))
        .finally(e => setIng(false));
    }
  }, [params, globalState.user]);
  return (
    <div className="container">
      <Helmet>
        <title>管理用户</title>
      </Helmet>
      <div className="has-text-right">
        <button
          className="button is-info"
          onClick={() => {
            setEditingUser(undefined);
            setModalActive(true);
          }}
        >
          添加
        </button>
      </div>
      {ing && <Loader />}
      <div className="table-container">
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>用户名</th>
              <th>昵称</th>
              <th>邮箱</th>
              <th>管理员</th>
              <th>上次登录</th>
              <th>注册时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(i => (
              <Row
                item={i}
                key={i.id}
                onDelete={() =>
                  window.confirm(`确定删除用户「${i.username}」？`) &&
                  deleteUser(i.id)
                    .then(() => {
                      setUsers(users.filter(j => j.id !== i.id));
                    })
                    .catch(Toast.error)
                }
                onEdit={() => {
                  setEditingUser(i);
                  setModalActive(true);
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pager items={users} curParams={params} onClick={p => setParams(p)} />
      <EditModal
        isActive={modalActive}
        onClose={() => setModalActive(false)}
        onSave={u => {
          upsertUser(u)
            .then(() => setModalActive(false))
            .catch(Toast.error);
        }}
        user={editingUser}
      />
    </div>
  );
};

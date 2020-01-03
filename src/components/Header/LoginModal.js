import React, { useState, useRef, useEffect } from 'react';
import Api from '../../utils/api';
import Toast from '../../utils/toast';

const submitLogin = (username, password) => {
  if (username && password) {
    return Api.login('/users/access-token', username, password).then(r => {
      return Api.post('/users/test-token');
    });
  }
  return Promise.reject('请填写完整');
};

export default ({ isActive, onClose, onLoggedin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const elInput = useRef(null);
  const _onSubmit = () => {
    submitLogin(username, password)
      .then(e => {
        Toast.success('登录成功');
        onLoggedin(e);
      })
      .catch(Toast.error);
  };
  useEffect(() => {
    if (isActive && elInput.current) {
      elInput.current.focus();
    }
  }, [isActive]);
  return (
    <div className={`modal login ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title has-text-centered">登录</h1>
          <form>
            <div className="field">
              <label className="label">用户名</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  ref={elInput}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">密码</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  onKeyPress={e => e.charCode === 13 && _onSubmit()}
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="button"
                  className="button is-link"
                  onClick={_onSubmit}
                >
                  登录
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-link is-light"
                  onClick={onClose}
                >
                  取消
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button
        type="button"
        className="modal-close is-large"
        onClick={onClose}
      ></button>
    </div>
  );
};

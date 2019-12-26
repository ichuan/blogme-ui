import React, { useState, useEffect } from 'react';

export default ({ isActive, onClose, onSave, user = {} }) => {
  const [username, setUsername] = useState(user.username || '');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(user.display_name || '');
  const [email, setEmail] = useState(user.email || '');
  const [isSuperuser, setIsSuperuser] = useState(
    user.is_superuser ? 'yes' : 'no'
  );
  useEffect(() => {
    setUsername(user.username || '');
  }, [user.username]);
  useEffect(() => {
    setDisplayName(user.display_name || '');
  }, [user.display_name]);
  useEffect(() => {
    setEmail(user.email || '');
  }, [user.email]);
  useEffect(() => {
    setIsSuperuser(user.is_superuser ? 'yes' : 'no');
  }, [user.is_superuser]);
  return (
    <div className={`modal edit-user ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title has-text-centered">
            {user.id ? '编辑' : '添加'}
          </h1>
          <form>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">用户名</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={username}
                      disabled={!!user.id}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">昵称</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">密码</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder={user.id ? '留空表示不修改' : ''}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Email</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label">管理员？</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <label className="radio">
                      <input
                        type="radio"
                        name="is_superuser"
                        value="yes"
                        checked={isSuperuser === 'yes'}
                        onChange={e => setIsSuperuser(e.target.value)}
                      />{' '}
                      是
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="is_superuser"
                        value="no"
                        checked={isSuperuser === 'no'}
                        onChange={e => setIsSuperuser(e.target.value)}
                      />{' '}
                      否
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-grouped is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <button
                      type="button"
                      className="button is-link"
                      onClick={() =>
                        onSave({
                          username,
                          display_name: displayName,
                          password,
                          email,
                          is_superuser: isSuperuser === 'yes',
                          id: user.id,
                        })
                      }
                    >
                      保存
                    </button>
                    <button
                      type="button"
                      className="button is-link is-light"
                      onClick={onClose}
                      style={{ marginLeft: '1em' }}
                    >
                      取消
                    </button>
                  </div>
                </div>
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

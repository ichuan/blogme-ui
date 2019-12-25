import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from './Editor';
import Api from '../../utils/api';

const newArticle = (subject, content) => {
  if (!subject) {
    return Promise.reject('请输入标题');
  }
  return Api.post('/articles', { subject, content });
};

export default () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  return (
    <div className="container editor">
      {error && <div className="notification is-danger">{error}</div>}
      <form>
        <div className="field is-pulled-right">
          <div className="control">
            <button
              type="button"
              className="button is-info"
              onClick={() => {
                newArticle(subject, content)
                  .then(r => history.push(`/p/${r.id}`))
                  .catch(setError);
              }}
            >
              发布
            </button>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="标题"
              onChange={e => setSubject(e.target.value)}
            />
          </div>
        </div>
        <Editor value={content} onChange={setContent} />
      </form>
    </div>
  );
};

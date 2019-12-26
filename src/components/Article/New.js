import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from './Editor';
import Api from '../../utils/api';

const saveArticle = (subject, content, existingId) => {
  if (!subject) {
    return Promise.reject('请输入标题');
  }
  let params = { subject, content };
  return existingId
    ? Api.put(`/articles/${existingId}`, params)
    : Api.post('/articles', params);
};

export default ({ item = {} }) => {
  const [subject, setSubject] = useState(item.subject || '');
  const [content, setContent] = useState(item.content || '');
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
                saveArticle(subject, content, item.id)
                  .then(r => history.push(`/p/${r.id || item.id}`))
                  .catch(setError);
              }}
            >
              {item.id ? '保存' : '发布'}
            </button>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="标题"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>
        </div>
        <Editor value={content} onChange={setContent} />
      </form>
    </div>
  );
};

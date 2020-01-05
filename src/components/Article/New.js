import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Editor from './Editor';
import Api from '../../utils/api';
import Toast from '../../utils/toast';

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
  let [ing, setIng] = useState(false);
  const history = useHistory();
  return (
    <div className="container editor">
      <Helmet>
        <title>{`${item.id ? '编辑' : '发布'}文章`}</title>
      </Helmet>
      <form>
        <div className="has-text-right">
          <button
            type="button"
            className={`button is-info ${ing ? 'is-loading' : ''}`}
            onClick={() => {
              setIng(true);
              saveArticle(subject, content, item.id)
                .then(r => {
                  Toast.success('保存成功');
                  history.push(`/p/${r.id || item.id}`);
                })
                .catch(Toast.error)
                .finally(e => setIng(false));
            }}
          >
            {item.id ? '保存' : '发布'}
          </button>
        </div>
        <div className="field">
          <label className="label">标题</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">正文</label>
          <div className="control">
            <Editor value={content} onChange={setContent} />
          </div>
        </div>
      </form>
    </div>
  );
};

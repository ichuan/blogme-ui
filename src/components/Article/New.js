import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Editor from './Editor';
import Api from '../../utils/api';
import Toast from '../../utils/toast';

const Draft = {
  _key: 'bm.draft',
  get() {
    const value = window.localStorage.getItem(this._key);
    return value ? JSON.parse(value) : '';
  },
  set(data) {
    return window.localStorage.setItem(this._key, JSON.stringify(data));
  },
  remove() {
    return window.localStorage.removeItem(this._key);
  },
};

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
  const elEditor = useRef(null);
  let [ing, setIng] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const _draft = Draft.get();
    if (!item.id && _draft) {
      if (window.confirm('发现有之前未保存的草稿，是否恢复？')) {
        setSubject(_draft.subject);
        setContent(_draft.content);
        elEditor.current.editor.loadJSON(_draft.state);
      } else {
        Draft.remove();
      }
    }
  }, [item.id]);
  useEffect(() => {
    if (!item.id && subject && content) {
      Draft.set({ subject, content, state: elEditor.current.editor });
    }
  }, [item.id, subject, content]);
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
                  Draft.remove();
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
            <Editor
              ref={elEditor}
              value={content}
              onChange={setContent}
              onUploadStart={() => setIng(true)}
              onUploadEnd={() => setIng(false)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

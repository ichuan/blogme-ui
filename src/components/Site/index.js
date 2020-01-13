import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useGlobal from '../../utils/hooks';
import Api from '../../utils/api';
import Favicon from '../../utils/favicon';

export default () => {
  const [globalState, globalActions] = useGlobal();
  const [siteName, setSiteName] = useState();
  const [siteDesc, setSiteDesc] = useState();
  const [siteFavText, setSiteFavText] = useState();
  const [ing, setIng] = useState({});
  useEffect(() => {
    setSiteName(globalState.config['site.name']);
    setSiteDesc(globalState.config['site.desc']);
    Favicon.setWithDomainDefault(globalState.config['site.favtext']);
  }, [globalState.config]);
  const saveConfig = (key, value) => {
    setIng({ ...ing, [key]: true });
    return Api.put('/config', { key, value: value || '' })
      .then(r => {
        globalActions.setConfig({ ...globalState.config, [key]: value });
      })
      .finally(e => {
        setIng({ ...ing, [key]: false });
      });
  };
  const uploadHeaderBg = e => {
    const f = e.target.files[0];
    return (
      f &&
      Api.upload('/articles/upload', f).then(r =>
        saveConfig('site.header-bg', r.url)
      )
    );
  };

  return (
    <div className="container">
      <Helmet>
        <title>网站配置</title>
      </Helmet>
      <form>
        <div className="field">
          <label className="label">网站标题</label>
          <div className={`control ${ing['site.name'] ? 'is-loading' : ''}`}>
            <input
              className="input"
              type="text"
              value={siteName || ''}
              onChange={e => setSiteName(e.target.value)}
              onKeyDown={e =>
                e.keyCode === 13 && saveConfig('site.name', siteName)
              }
              onBlur={e => saveConfig('site.name', siteName)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">网站介绍</label>
          <div className={`control ${ing['site.desc'] ? 'is-loading' : ''}`}>
            <input
              className="input"
              type="text"
              value={siteDesc || ''}
              onChange={e => setSiteDesc(e.target.value)}
              onKeyDown={e =>
                e.keyCode === 13 && saveConfig('site.desc', siteDesc)
              }
              onBlur={e => saveConfig('site.desc', siteDesc)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">网站 favicon 文字（一个字）</label>
          <div className={`control ${ing['site.favtext'] ? 'is-loading' : ''}`}>
            <input
              className="input"
              type="text"
              value={siteFavText || ''}
              onChange={e => setSiteFavText(e.target.value)}
              onKeyDown={e =>
                e.keyCode === 13 && saveConfig('site.favtext', siteFavText)
              }
              onBlur={e => saveConfig('site.favtext', siteFavText)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">顶部背景图</label>
          <div
            className={`control ${ing['site.header-bg'] ? 'is-loading' : ''}`}
          >
            <label className="radio">
              <input
                type="radio"
                name="header-bg"
                onClick={e => saveConfig('site.header-bg', '')}
              />{' '}
              使用默认
            </label>
            <label className="radio">
              <input type="radio" name="header-bg" /> 上传{' '}
              <input type="file" onChange={uploadHeaderBg} />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

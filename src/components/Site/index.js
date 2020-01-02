import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useGlobal from '../../utils/hooks';
import Api from '../../utils/api';

export default () => {
  const [globalState, globalActions] = useGlobal();
  const [siteName, setSiteName] = useState(globalState.config['site.name']);
  const [siteDesc, setSiteDesc] = useState(globalState.config['site.desc']);
  const saveConfig = (key, value) => {
    return Api.put('/config', { key, value }).then(r => {
      globalState.config[key] = value;
      globalActions.setConfig(globalState.config);
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
          <div className="control">
            <input
              className="input"
              type="text"
              value={siteName}
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
          <div className="control">
            <input
              className="input"
              type="text"
              value={siteDesc}
              onChange={e => setSiteDesc(e.target.value)}
              onKeyDown={e =>
                e.keyCode === 13 && saveConfig('site.desc', siteDesc)
              }
              onBlur={e => saveConfig('site.desc', siteDesc)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">顶部背景图</label>
          <div className="control">
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

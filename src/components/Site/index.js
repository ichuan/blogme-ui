import React, { useState } from 'react';
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

  return (
    <div className="container">
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
      </form>
    </div>
  );
};

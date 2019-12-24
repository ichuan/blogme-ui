import React, { useEffect } from 'react';
import Editor from './Editor';

export default () => {
  return (
    <div className="container">
      <form>
        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="标题" />
          </div>
        </div>
        <Editor />
      </form>
    </div>
  );
};

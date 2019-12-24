import React, { useEffect } from 'react';

import 'trix';
import 'trix/dist/trix.css';

export default () => {
  const id = `input-${+new Date()}`;
  useEffect(() => {
    const uploadFile = e => {
      if (e.attachment.file) {
        // TODO upload
        // see https://trix-editor.org/js/attachments.js
      }
    };
    window.addEventListener('trix-attachment-add', uploadFile);
    return () => {
      window.removeEventListener('trix-attachment-add', uploadFile);
    };
  }, []);
  return (
    <div>
      <input id={id} type="hidden" name="content" />
      <trix-editor input={id} class="content trix-content"></trix-editor>
    </div>
  );
};

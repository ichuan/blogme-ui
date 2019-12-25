import React, { useEffect, useRef } from 'react';
import Api from '../../utils/api';

import 'trix';
import 'trix/dist/trix.css';

export default ({ value, onChange }) => {
  const id = `input-${+new Date()}`,
    elInput = useRef(null);
  useEffect(() => {
    const uploadFile = e => {
      if (e.attachment.file) {
        Api.upload('/articles/upload', e.attachment.file, p =>
          e.attachment.setUploadProgress(p)
        ).then(ret => {
          e.attachment.setAttributes({
            url: ret.url,
            href: ret.url,
            // 图片不显示文件大小
            ...(/(jpe?g|png|gif)$/i.test(ret.url) ? { filesize: null } : {}),
          });
        });
      }
    };
    window.addEventListener('trix-attachment-add', uploadFile);
    return () => {
      window.removeEventListener('trix-attachment-add', uploadFile);
    };
  }, []);
  useEffect(() => {
    let content = null;
    const handle = setInterval(() => {
      if (elInput) {
        let value = elInput.current.value,
          isFirstTime = content === null;
        if (!isFirstTime && content !== value) {
          onChange(value);
        }
        content = value;
      }
    }, 500);
    return () => {
      clearInterval(handle);
    };
  }, [onChange]);
  return (
    <div>
      <input
        id={id}
        ref={elInput}
        type="hidden"
        name="content"
        value={value}
        onChange={console.log}
      />
      <trix-editor
        placeholder="正文"
        input={id}
        class="content trix-content"
      ></trix-editor>
    </div>
  );
};

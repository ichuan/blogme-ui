import React, { useEffect } from 'react';
import Api from '../../utils/api';

import 'trix';
import 'trix/dist/trix.css';

export default React.forwardRef(({ value, onChange }, ref) => {
  const id = `input-${+new Date()}`;
  useEffect(() => {
    const uploadFile = e => {
      if (e.attachment.file) {
        Api.upload('/articles/upload', e.attachment.file, p =>
          e.attachment.setUploadProgress(p)
        ).then(ret => {
          e.attachment.setAttributes({
            url: ret.url,
            href: ret.url,
            // 图片不显示文件大小和文件名
            ...(/(jpe?g|png|gif)$/i.test(ret.url)
              ? { filesize: null, filename: null }
              : {}),
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
    const fn = e => onChange(e.target.value);
    window.addEventListener('trix-change', fn);
    return () => {
      window.removeEventListener('trix-change', fn);
    };
  }, [onChange]);
  return (
    <div>
      <input id={id} type="hidden" name="content" value={value} />
      <trix-editor ref={ref} input={id} class="content is-trix"></trix-editor>
    </div>
  );
});

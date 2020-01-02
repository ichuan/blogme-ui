import React from 'react';

export default ({ className, href, children, onClick }) => {
  let attrs = { href: '#' };
  className && (attrs.className = className);
  href && (attrs.href = href);
  if (onClick) {
    attrs.onClick = e => {
      e.preventDefault();
      onClick(e);
    };
  } else {
    attrs.onClick = e => e.preventDefault();
  }

  return <a {...attrs}>{children}</a>;
};

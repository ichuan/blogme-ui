import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const year = new Date().getFullYear(),
    hostname = window.location.hostname;
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          &copy; {year} {hostname} ·{' '}
          <Link to="/archive" className="has-text-grey-dark">
            文章索引
          </Link>
        </p>
      </div>
    </footer>
  );
};

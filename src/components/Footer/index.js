import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const year = new Date().getFullYear(),
    hostname = window.location.hostname;
  return (
    <footer className="footer">
      <div className="level is-mobile container">
        <div className="level-left">
          <div className="level-item">
            <p>
              &copy; {year} {hostname}
            </p>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <p>
              <Link to="/archive" className="has-text-grey-dark">
                文章索引
              </Link>{' '}
              ·{' '}
              <a href="/feed/" target="_blank" className="has-text-grey-dark">
                RSS
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

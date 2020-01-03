import React from 'react';

export default () => {
  const year = new Date().getFullYear(),
    hostname = window.location.hostname;
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Copyright &copy; {year} {hostname}
        </p>
      </div>
    </footer>
  );
};

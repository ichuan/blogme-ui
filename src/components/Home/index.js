import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useGlobal from '../../utils/hooks';

export default function() {
  const globalState = useGlobal()[0];
  return (
    <div>
      <Helmet>
        <title>{`首页 - ${globalState.config['site.name']}`}</title>
      </Helmet>
      <p>Home</p>
      <Link to="/p/hello-word">Hello, world</Link>
    </div>
  );
}

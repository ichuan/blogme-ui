import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function() {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <p>Home</p>
      <Link to="/p/hello-word">Hello, world</Link>
    </div>
  );
}

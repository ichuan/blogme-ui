import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function() {
  let { articleId } = useParams();
  return (
    <div>
      <Helmet>
        <title>{articleId}</title>
      </Helmet>
      <p>Home</p>
      <Link to="/">Back Home</Link>
    </div>
  );
}

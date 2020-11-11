import React from 'react';
import { Helmet } from 'react-helmet';

const SEO: React.FC = () => {
  return (
    <Helmet>
      <meta charSet={'utf-8'} />
      <title>Company management</title>
      <html lang='pl' />
    </Helmet>
  );
};

export default SEO;

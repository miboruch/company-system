import React from 'react';

import CompanyRoutes from './components/CompanyRoutes/CompanyRoutes';

const Company: React.FC = () => (
  //TODO: permissions context wrapper
  <div style={{width: '100%'}}>
    <CompanyRoutes />
  </div>
);

export default Company;

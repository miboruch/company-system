import React from 'react';

import CompanyRoutes from './components/CompanyRoutes/CompanyRoutes';
import companyPermissions from 'guard/company.permission';
import { CompanyPermissionsContext } from 'guard/context/company-permissions.context';

import { Wrapper } from './Company.styles';

const Company: React.FC = () => (
  <CompanyPermissionsContext.Provider value={companyPermissions}>
    <Wrapper>
      <CompanyRoutes />
    </Wrapper>
  </CompanyPermissionsContext.Provider>
);

export default Company;

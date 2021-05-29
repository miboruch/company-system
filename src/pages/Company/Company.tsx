import React from 'react';

import CompanyRoutes from './components/CompanyRoutes/CompanyRoutes';
import { CompanyPermissionsContext } from 'guard/context/company-permissions.context';
import companyPermissions from 'guard/company.permission';

import { Wrapper } from './Company.styles';

const Company: React.FC = () => (
  <CompanyPermissionsContext.Provider value={companyPermissions}>
    <Wrapper>
      <CompanyRoutes />
    </Wrapper>
  </CompanyPermissionsContext.Provider>
);

export default Company;

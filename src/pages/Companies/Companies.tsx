import React from 'react';

import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import CompaniesContent from 'pages/Companies/components/CompaniesContent/CompaniesContent';

const Companies: React.FC = () => {
  return (
    <MenuTemplate>
      <CompaniesContent />
    </MenuTemplate>
  );
};
export default Companies;

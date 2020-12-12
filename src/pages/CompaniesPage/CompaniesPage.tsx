import React from 'react';

import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import CompaniesPageContent from '../../components/organisms/CompaniesPageContent/CompaniesPageContent';

const CompaniesPage: React.FC = () => {
  return (
    <MenuTemplate>
      <CompaniesPageContent />
    </MenuTemplate>
  );
};
export default CompaniesPage;

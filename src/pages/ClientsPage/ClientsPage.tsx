import React from 'react';

import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import ClientsPageContent from '../../components/organisms/ClientsPageContent/ClientsPageContent';

const ClientsPage: React.FC = () => {
  return (
    <MenuTemplate>
      <ClientsPageContent />
    </MenuTemplate>
  );
};

export default ClientsPage;

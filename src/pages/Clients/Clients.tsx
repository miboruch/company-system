import React from 'react';

import { MenuTemplate } from 'components';
import ClientsPageContent from './components/ClientsPageContent/ClientsPageContent';

const Clients: React.FC = () => {
  return (
    <MenuTemplate>
      <ClientsPageContent />
    </MenuTemplate>
  );
};

export default Clients;

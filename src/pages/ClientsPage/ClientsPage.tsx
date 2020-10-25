import React from 'react';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import ClientsPageContent from '../../components/organisms/ClientsPageContent/ClientsPageContent';

interface Props {}

const ClientsPage: React.FC<Props> = () => {
  return (
    <MenuTemplate>
      <ClientsPageContent />
    </MenuTemplate>
  );
};

export default ClientsPage;

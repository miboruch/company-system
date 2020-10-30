import React from 'react';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import FinancesPageContent from '../../components/organisms/FinancesPageContent/FinancesPageContent';

interface Props {}

const FinancesPage: React.FC<Props> = () => {
  return (
    <MenuTemplate>
      <FinancesPageContent />
    </MenuTemplate>
  );
};

export default FinancesPage;

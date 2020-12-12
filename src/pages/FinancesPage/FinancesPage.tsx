import React, { useEffect } from 'react';

import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import FinancesPageContent from '../../components/organisms/FinancesPageContent/FinancesPageContent';

import { fetchAllFinancesData } from '../../ducks/finances/finances-creators';
import { useAppDispatch } from '../../store/store';

const FinancesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllFinancesData());
  }, []);

  return (
    <MenuTemplate>
      <FinancesPageContent />
    </MenuTemplate>
  );
};

export default FinancesPage;

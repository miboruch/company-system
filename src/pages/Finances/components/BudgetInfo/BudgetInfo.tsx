import React from 'react';
import { fetchCompanyBudget, fetchFinances } from 'api';
import { useFetch, useShowContent } from 'components/hooks';

interface Props{

}

const BudgetInfo: React.FC<Props> = () => {
  const companyBudgetData = useFetch<typeof fetchFinances>(fetchCompanyBudget);
  const { showContent, showLoader } = useShowContent(companyBudgetData);
  const { payload: companyBudget } = companyBudgetData;

 return (
  <div>

  </div>
 );
};

export default BudgetInfo;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useAbility } from '@casl/react';

import BarChart from 'components/charts/BarChart/BarChart';
import { Chart, Spinner } from 'components';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchFinances, fetchCompletedPeriodTasks } from 'api';
import { CompanyPermissionsContext } from 'guard/context/company-permissions.context';

const ChartSpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const Charts: React.FC = () => {
  const ability = useAbility(CompanyPermissionsContext);
  const [daysBack, setDaysBackTo] = useState<number>(7);

  const financesData = useFetch(fetchFinances({ daysBack }), { dependencies: [daysBack] });
  const { showLoader } = useShowContent(financesData);
  const { payload: finances } = financesData;

  const tasksData = useFetch(fetchCompletedPeriodTasks({ daysBack }), {
    dependencies: [daysBack]
  });
  const { showContent: showTaskContent, showLoader: showTaskLoader } = useShowContent(financesData);
  const { payload: completedTasks } = tasksData;

  const isLoading = showLoader || showTaskLoader;

  const canReadBudget = ability.can('read', 'Budget');

  return (
    <>
      {isLoading && (
        <ChartSpinnerWrapper>
          <Spinner />
        </ChartSpinnerWrapper>
      )}
      {canReadBudget && (
        <Chart
          xAxisDataKey={'createdDate'}
          secondBarDataKey={'expenseValue'}
          secondBarDataName={'Wydatek'}
          barDataKey={'incomeValue'}
          barDataName={'Dochód'}
          data={finances}
          daysBack={daysBack}
          setDaysBack={setDaysBackTo}
        />
      )}
      {!canReadBudget && (
        <BarChart
          data={completedTasks}
          xAxisDataKey={'date'}
          barDataKey={'totalTasks'}
          barDataName={'Zadania'}
          setDaysBack={setDaysBackTo}
          daysBack={daysBack}
        />
      )}
    </>
  );
};

export default Charts;

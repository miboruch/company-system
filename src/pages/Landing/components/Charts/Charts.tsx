import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AppState } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { Chart, Spinner } from 'components';
import BarChart from 'components/charts/BarChart/BarChart';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchFinances, fetchCompletedPeriodTasks } from 'api';

const ChartSpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

interface Props {}

const Charts: React.FC<Props> = () => {
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const [daysBack, setDaysBackTo] = useState<number>(7);

  const financesData = useFetch(fetchFinances({ daysBack }), { dependencies: [daysBack] });
  const { showContent, showLoader } = useShowContent(financesData);
  const { payload: finances } = financesData;

  const tasksData = useFetch(fetchCompletedPeriodTasks({ daysBack }), {
    dependencies: [daysBack]
  });
  const { showContent: showTaskContent, showLoader: showTaskLoader } = useShowContent(financesData);
  const { payload: completedTasks } = tasksData;

  const isAdmin = role === UserRole.Admin;
  const isLoading = showLoader || showTaskLoader;

  return (
    <>
      {isLoading && (
        <ChartSpinnerWrapper>
          <Spinner />
        </ChartSpinnerWrapper>
      )}
      {isAdmin && showContent && finances && (
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
      {!isAdmin && showTaskContent && completedTasks && (
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

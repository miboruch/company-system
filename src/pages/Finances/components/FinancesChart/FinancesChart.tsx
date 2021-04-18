import React, { useState } from 'react';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchFinances } from 'api';
import { Chart, Spinner } from 'components';

const FinancesChart: React.FC = () => {
  const [daysBack, setDaysBackTo] = useState<number>(7);

  const financesData = useFetch<typeof fetchFinances>(fetchFinances({ daysBack }), { dependencies: [daysBack] });
  const { showContent, showLoader } = useShowContent(financesData);
  const { payload: finances } = financesData;

  return (
    <>
      {showLoader && <Spinner />}
      {showContent && finances && (
        <Chart
          xAxisDataKey={'createdDate'}
          secondBarDataKey={'expenseValue'}
          secondBarDataName={'Wydatek'}
          barDataKey={'incomeValue'}
          barDataName={'Dochód'}
          data={finances}
          setDaysBack={setDaysBackTo}
          daysBack={daysBack}
        />
      )}
    </>
  );
};

export default FinancesChart;

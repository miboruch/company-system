import React, { useState } from 'react';
import { GridWrapper } from 'components';

import { Content } from './History.styles';
import Table from 'pages/Finances/components/History/components/Table/Table';

export type HistoryType = 'income' | 'expense';

const History: React.FC = () => {
  const [type, setType] = useState<HistoryType>('income');

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Finanse - historia'} color={'#F8F8F8'}>
      <Content>
        <Table type={type} setType={setType} />
      </Content>
    </GridWrapper>
  );
};

export default History;

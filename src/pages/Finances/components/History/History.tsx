import React, { useState } from 'react';

import Table from './components/Table/Table';
import { GridWrapper } from 'components';

import { Content } from './History.styles';

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

import React from 'react';
import { GridWrapper } from 'components';

const History: React.FC = () => {
  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Finanse'}>
      <p>History</p>
    </GridWrapper>
  );
};

export default History;

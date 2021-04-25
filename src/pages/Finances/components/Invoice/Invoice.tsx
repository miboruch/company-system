import React from 'react';
import { GridWrapper } from 'components';

const Invoice: React.FC = () => {
  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Finanse'}>
      <p>Invoice</p>
    </GridWrapper>
  );
};

export default Invoice;

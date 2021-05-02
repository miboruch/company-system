import React from 'react';

import { TableHeader, HeaderText } from './HistoryHeader.styles';

const HistoryHeader: React.FC = () => {
  return (
    <TableHeader>
      <HeaderText>Nazwa</HeaderText>
      <HeaderText>Opis</HeaderText>
      <HeaderText>Data</HeaderText>
      <HeaderText>Kwota</HeaderText>
    </TableHeader>
  );
};

export default HistoryHeader;

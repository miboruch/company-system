import React from 'react';

import { AddButton, AddNewParagraph, RowWrapper } from './AddNewButton.styles';

interface Props {
  text: string;
  callback: () => void;
}

const AddNewButton: React.FC<Props> = ({ text, callback }) => {
  return (
    <RowWrapper onClick={() => callback()}>
      <AddButton>+</AddButton>
      <AddNewParagraph>{text}</AddNewParagraph>
    </RowWrapper>
  );
};

export default AddNewButton;

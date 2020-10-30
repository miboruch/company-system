import React from 'react';
import { ContentWrapper, Name, Subparagraph, Wrapper, ValueParagraph } from './ListBox.styles';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { CheckedIcon, EmptyIcon, NotCheckedIcon } from '../../../styles/iconStyles';

interface Props {
  name: string;
  topDescription: string | Date;
  bottomDescription: string;
  callback: () => void;
  isCompanyBox: boolean;
  isEmpty?: boolean;
  isChecked?: boolean;
  value?: number | string;
}

// interface EmptyIconInterface extends Props {
//   isEmpty: boolean;
//   isChecked?: never;
// }
//
// interface CheckedIconInterface extends Props {
//   isChecked: boolean;
//   isEmpty?: never;
// }

export type ListBoxProps = Props;
// export type ListBoxProps = EmptyIconInterface | CheckedIconInterface;

const ListBox: React.FC<ListBoxProps> = ({ name, topDescription, bottomDescription, callback, isEmpty, isChecked, isCompanyBox, value }) => {
  return (
    <Wrapper onClick={() => callback()}>
      <ContentWrapper>
        {!isCompanyBox && (isEmpty ? <EmptyIcon /> : isChecked ? <CheckedIcon /> : <NotCheckedIcon />)}
        <div>
          <Subparagraph>{topDescription}</Subparagraph>
          <Name>{name}</Name>
          <Subparagraph>{bottomDescription}</Subparagraph>
        </div>
      </ContentWrapper>
      {value ? <ValueParagraph>{value}</ValueParagraph> : <ArrowButton />}
    </Wrapper>
  );
};

export default ListBox;

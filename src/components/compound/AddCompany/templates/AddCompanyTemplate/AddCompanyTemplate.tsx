import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageContext } from '../../context/PageContext';
import { Wrapper } from './AddCompanyTemplate.styles';

interface Props {
  pageIndex: number;
  children: React.ReactNode;
  withoutPadding?: boolean;
}

const AddCompanyTemplate: React.FC<Props> = ({ pageIndex, children, withoutPadding }) => {
  const { currentPage } = useContext(PageContext);
  return <>{currentPage === pageIndex && <Wrapper withoutPadding={!!withoutPadding}>{children}</Wrapper>}</>;
};

export default AddCompanyTemplate;

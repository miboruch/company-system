import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageContext } from '../../context/PageContext';
import { Wrapper } from './AddCompanyTemplate.styles';

const ContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

interface Props {
  pageIndex: number;
  children: React.ReactNode;
}

const AddCompanyTemplate: React.FC<Props> = ({ pageIndex, children }) => {
  const { currentPage } = useContext(PageContext);
  return <ContentWrapper>{currentPage === pageIndex && children}</ContentWrapper>;
};

export default AddCompanyTemplate;

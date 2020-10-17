import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { Wrapper } from './AddCompanyTemplate.styles';

interface Props {
  pageIndex: PageSettingEnum;
  children: React.ReactNode;
  withoutPadding?: boolean;
}

const AddCompanyTemplate: React.FC<Props> = ({ pageIndex, children, withoutPadding }) => {
  const { currentPage } = useContext(PageContext);
  return <>{currentPage === pageIndex && children}</>;
  // return <>{currentPage === pageIndex && <Wrapper withoutPadding={!!withoutPadding}>{children}</Wrapper>}</>;
};

export default AddCompanyTemplate;

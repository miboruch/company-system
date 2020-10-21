import React from 'react';
import { ContentWrapper } from './ContentTemplate.styles';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const ContentTemplate: React.FC<Props> = ({ children, isOpen }) => {
  return <ContentWrapper isOpen={isOpen}>{children}</ContentWrapper>;
};

export default ContentTemplate;

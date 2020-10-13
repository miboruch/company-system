import React, { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import { ProgressionBarDiv } from './ProgressionBar.styles';

interface Props {
  allPages: number;
}

const ProgressionBar: React.FC<Props> = ({ allPages }) => {
  const { currentPage } = useContext(PageContext);
  return <ProgressionBarDiv allPages={allPages} page={currentPage + 1} />;
};

export default ProgressionBar;

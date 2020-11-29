import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/test-store';
import { Tile, Name, Description } from '../TaskTile/TaskTile.styles';
import { Paragraph } from '../../../styles/typography/typography';

interface Props {
  description: string;
  value: number;
  name: string;
  onClick?: () => void;
}

const BudgetTile: React.FC<Props> = ({ description, value, name, onClick }) => {
  const { currency } = useSelector((state: AppState) => state.currency);
  return (
    <Tile onClick={() => !!onClick && onClick()}>
      <Description>{description}</Description>
      <Name>{name}</Name>
      <Paragraph type={'main'}>
        {value} {currency.name}
      </Paragraph>
    </Tile>
  );
};

export default BudgetTile;

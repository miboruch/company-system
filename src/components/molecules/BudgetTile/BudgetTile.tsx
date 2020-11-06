import React from 'react';
import {Tile, Description, Name} from './BudgetTile.styles';

interface Props{
  description: string;
  value: number;
  name: string;
  onClick?: () => void;
}

const BudgetTile: React.FC<Props> = ({description, value, name, onClick}) => {
 return (
  <Tile onClick={() => !!onClick && onClick()}>
    <Description>{description}</Description>
    <Name>{name}</Name>
    <p>{value} PLN</p>
  </Tile>
 );
};

export default BudgetTile;

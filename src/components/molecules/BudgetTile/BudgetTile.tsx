import React from 'react';
import {Tile, Description, Name} from './BudgetTile.styles';
import { ExpenseInterface, IncomeInterface } from '../../../types/modelsTypes';

interface Props{
    data: IncomeInterface | ExpenseInterface,
  onClick?: () => void;
}

const BudgetTile: React.FC<Props> = ({data, onClick}) => {
 return (
  <Tile onClick={() => !!onClick && onClick()}>
    <Description>{data.description}</Description>
    <Name>{data.incomeValue ? data.incomeValue : data.expenseValue}</Name>
  </Tile>
 );
};

export default BudgetTile;

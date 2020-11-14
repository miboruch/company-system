import React from 'react';
import { connect } from 'react-redux';
import { Tile, Description, Name } from './BudgetTile.styles';
import { CurrencyInterface } from '../../../types/actionTypes/toggleAcitonTypes';
import { AppState } from '../../../reducers/rootReducer';

interface Props {
  description: string;
  value: number;
  name: string;
  onClick?: () => void;
}

type ConnectedProps = Props & LinkStateProps;

const BudgetTile: React.FC<ConnectedProps> = ({ description, value, name, onClick, currency }) => {
  return (
    <Tile onClick={() => !!onClick && onClick()}>
      <Description>{description}</Description>
      <Name>{name}</Name>
      <p>
        {value} {currency.name}
      </p>
    </Tile>
  );
};

interface LinkStateProps {
  currency: CurrencyInterface;
}

const mapStateToProps = ({ toggleReducer: { currency } }: AppState): LinkStateProps => {
  return { currency };
};

export default connect(mapStateToProps)(BudgetTile);

import React from 'react';
import { connect } from 'react-redux';
import { CurrencyInterface } from '../../../types/actionTypes/toggleAcitonTypes';
import { AppState } from '../../../reducers/rootReducer';
import { Tile, Name, Description } from '../TaskTile/TaskTile.styles';
import { Paragraph } from '../../../styles/typography/typography';

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
      <Paragraph type={'main'}>
        {value} {currency.name}
      </Paragraph>
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

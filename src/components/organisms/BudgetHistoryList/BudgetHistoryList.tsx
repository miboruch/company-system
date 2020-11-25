import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ExpenseInterface, IncomeInterface } from '../../../types/modelsTypes';
import ListBox from '../../molecules/ListBox/ListBox';
import { CurrencyInterface } from '../../../types/actionTypes/toggleAcitonTypes';
import { AppState } from '../../../store/test-store';
import { roundTo2 } from '../../../utils/functions';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  // background-color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    height: 100%;
    min-height: auto;
    grid-area: history;
    align-self: center;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Title = styled.h3`
  font-size: 18px;
  letter-spacing: -2px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.dark};
  padding: 3rem 2rem;
`;

interface Props {
  budgetHistory: (IncomeInterface | ExpenseInterface)[];
}

type ConnectedProps = Props & LinkStateProps;

const BudgetHistoryList: React.FC<ConnectedProps> = ({ budgetHistory, currency }) => {
  return (
    <StyledWrapper>
      <Title>Historia</Title>
      <ContentWrapper>
        {budgetHistory.map((history, index: number) => (
          <ListBox
            key={history._id}
            name={history.description}
            topDescription={new Date(history.createdDate).toLocaleDateString()}
            bottomDescription={history.incomeValue ? 'Przychód' : 'Wydatek'}
            isCompanyBox={false}
            isEmpty={true}
            callback={() => console.log('test')}
            value={`${history.expenseValue ? -1 * roundTo2(history.expenseValue * currency.value) : history.incomeValue ? roundTo2(history.incomeValue * currency.value) : 0} ${currency.name}`}
          />
        ))}
      </ContentWrapper>
    </StyledWrapper>
  );
};

interface LinkStateProps {
  currency: CurrencyInterface;
}

const mapStateToProps = ({ toggleReducer: { currency } }: AppState): LinkStateProps => {
  return { currency };
};

export default connect(mapStateToProps)(BudgetHistoryList);

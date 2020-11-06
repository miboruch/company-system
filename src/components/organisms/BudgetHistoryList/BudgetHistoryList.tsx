import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ExpenseInterface, IncomeInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import ListBox from '../../molecules/ListBox/ListBox';

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

const Title = styled.h3`
  font-size: 18px;
  letter-spacing: -2px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.dark};
  padding: 3rem 2rem;
`;

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const BudgetHistoryList: React.FC<ConnectedProps> = ({ lastIncomes, lastExpenses }) => {
  const [data, setData] = useState<(IncomeInterface | ExpenseInterface)[]>([]);
  useEffect(() => {
    setData([...lastExpenses, ...lastIncomes]);
  }, [lastIncomes, lastExpenses]);

  return (
    <StyledWrapper>
      <Title>Historia</Title>
      {data.map((budgetHistory, index: number) => (
        <ListBox
          key={budgetHistory._id}
          name={budgetHistory.description}
          topDescription={budgetHistory.createdDate.toLocaleString()}
          bottomDescription={budgetHistory.companyId}
          isCompanyBox={false}
          callback={() => console.log('test')}
          value={`${budgetHistory.incomeValue ? budgetHistory.incomeValue : budgetHistory.expenseValue} PLN`}
        />
      ))}
    </StyledWrapper>
  );
};

interface LinkStateProps {
  lastIncomes: IncomeInterface[];
  lastExpenses: ExpenseInterface[];
}

const mapStateToProps = ({ financeReducer: { lastIncomes, lastExpenses } }: AppState): LinkStateProps => {
  return { lastIncomes, lastExpenses };
};

export default connect(mapStateToProps)(BudgetHistoryList);

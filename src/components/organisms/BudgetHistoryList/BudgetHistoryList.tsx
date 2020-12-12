import React from 'react';
import { useSelector } from 'react-redux';

import ListBox from '../../molecules/ListBox/ListBox';

import { ExpenseInterface, IncomeInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../store/store';
import { roundTo2 } from '../../../utils/functions';
import { Paragraph } from '../../../styles/typography/typography';
import { EmptyWrapper } from '../../../styles/shared';
import { StyledWrapper, ContentWrapper, Title } from './BudgetHistoryList.styles';

interface Props {
  budgetHistory: (IncomeInterface | ExpenseInterface)[];
}

const BudgetHistoryList: React.FC<Props> = ({ budgetHistory }) => {
  const { currency } = useSelector((state: AppState) => state.currency);
  return (
    <StyledWrapper>
      <Title>Historia</Title>
      <ContentWrapper>
        {budgetHistory.length === 0 ? (
          <EmptyWrapper>
            <Paragraph type={'empty'}>Brak danych</Paragraph>
          </EmptyWrapper>
        ) : (
          budgetHistory.map((history, index: number) => (
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
          ))
        )}
      </ContentWrapper>
    </StyledWrapper>
  );
};

export default BudgetHistoryList;

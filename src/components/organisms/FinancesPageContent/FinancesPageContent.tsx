import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import Chart from '../../molecules/Chart/Chart';
import { ExpenseInterface, IncomeDataInterface, IncomeInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import gsap from 'gsap';
import { contentAnimation } from '../../../animations/animations';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getIncomeExpenseInTimePeriod } from '../../../actions/financeActions';
import BudgetHistoryList from '../BudgetHistoryList/BudgetHistoryList';
import BudgetTile from '../../molecules/BudgetTile/BudgetTile';

const Content = styled.div`
  width: 100%;
  height: 100%;
  grid-area: content;
  background-color: #fff;
`;

const BudgetWrapper = styled.section`
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  overflow-x: scroll;
  flex-direction: row;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: budget;
  }
`;

const InfoBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) => theme.mq.hdReady} {
    //display: contents;
    grid-area: currency;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100%;
    grid-area: buttons;
  }
`;

const InfoWrapper = styled.section`
  width: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: info;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.dark};
    border-radius: 30px;
  }
`;

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const FinancesPageContent: React.FC<ConnectedProps> = ({ getIncomeExpenseInTimePeriod, lastIncomes, lastExpenses, budget }) => {
  const [chartData, setChartData] = useState<Array<IncomeDataInterface> | null>(null);
  const [daysBack, setDaysBackTo] = useState<number>(7);
  const [budgetHistoryData, setBudgetHistoryData] = useState<(IncomeInterface | ExpenseInterface)[]>([]);

  useEffect(() => {
    setBudgetHistoryData([...lastExpenses, ...lastIncomes]);
  }, [lastIncomes, lastExpenses]);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    contentAnimation(tl, contentRef);
  }, []);

  useEffect(() => {
    getIncomeExpenseInTimePeriod(daysBack, setChartData);
  }, [daysBack]);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Finanse'}>
      <Content>
        <ContentGridWrapper ref={contentRef} isFinancesPage={true}>
          <BudgetWrapper>
            <BudgetTile description={'Budżet firmy'} name={'Aktualny budżet firmy'} value={budget} />
            {budgetHistoryData.slice(0, 2).map((history) => (
              <BudgetTile description={'Finanse'} value={history.expenseValue ? -1 * history.expenseValue : history.incomeValue ? history.incomeValue : 0} name={history.description} />
            ))}
          </BudgetWrapper>
          <Chart
            xAxisDataKey={'createdDate'}
            secondBarDataKey={'expenseValue'}
            secondBarDataName={'Wydatek'}
            barDataKey={'incomeValue'}
            barDataName={'Dochód'}
            data={chartData}
            setDaysBack={setDaysBackTo}
            daysBack={daysBack}
          />
          <BudgetHistoryList budgetHistory={budgetHistoryData} />
          <InfoBoxWrapper>
            <p>PLN</p>
            <p>EUR</p>
            <p>USD</p>
          </InfoBoxWrapper>
          <ButtonWrapper>
            <p>Test</p>
          </ButtonWrapper>
          <InfoWrapper>
            <p>Info</p>
          </InfoWrapper>
        </ContentGridWrapper>
      </Content>
    </GridWrapper>
  );
};

interface LinkStateProps {
  lastIncomes: IncomeInterface[];
  lastExpenses: ExpenseInterface[];
  budget: number;
}

interface LinkDispatchProps {
  getIncomeExpenseInTimePeriod: (daysBack: number, setData: (data: any[]) => void) => void;
}

const mapStateToProps = ({ financeReducer: { lastIncomes, lastExpenses, budget } }: AppState): LinkStateProps => {
  return { lastIncomes, lastExpenses, budget };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getIncomeExpenseInTimePeriod: bindActionCreators(getIncomeExpenseInTimePeriod, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancesPageContent);

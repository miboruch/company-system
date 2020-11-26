import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import styled from 'styled-components';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import Chart from '../../molecules/Chart/Chart';
import { ExpenseInterface, IncomeDataInterface, IncomeInterface } from '../../../types/modelsTypes';
import { AppState, useAppDispatch } from '../../../store/test-store';
import { Heading } from '../../../styles/typography/typography';
import gsap from 'gsap';
import { contentAnimation } from '../../../animations/animations';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getIncomeExpenseInTimePeriod } from '../../../actions/financeActions';
import BudgetHistoryList from '../BudgetHistoryList/BudgetHistoryList';
import BudgetTile from '../../molecules/BudgetTile/BudgetTile';
import Button from '../../atoms/Button/Button';
import IncomeExpensePopup, { FinancePopupInterface } from '../../molecules/IncomeExpensePopup/IncomeExpensePopup';
import { getCurrencyValue } from '../../../ducks/currency/currency-creators';
import { roundTo2 } from '../../../utils/functions';
import { appCurrencies } from '../../../utils/config';
import { InfoWrapper, StatisticsHeading } from '../LandingPageContent/LandingPageContent.styles';
import { ArrowIcon } from '../../../styles/iconStyles';
import GenerateInvoice from '../GenerateInvoice/GenerateInvoice';

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
    border: 1px solid ${({ theme }) => theme.colors.impactGray};
    grid-area: currency;
    border-radius: 30px;
    padding: 3rem;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    flex-direction: row;
    height: 100%;
    grid-area: buttons;
    border-radius: 30px;
    border: 1px solid ${({ theme }) => theme.colors.impactGray};
  }
`;

interface CurrencyBoxInterface {
  isActive: boolean;
}

const CurrencyBox = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: grid;
  place-items: center;
`;

type ConnectedProps = LinkStateProps & LinkDispatchProps;

const FinancesPageContent: React.FC<ConnectedProps> = ({ getIncomeExpenseInTimePeriod, lastIncomes, lastExpenses, budget }) => {
  const dispatch = useAppDispatch();
  const { currency } = useSelector((state: AppState) => state.currency);
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [isGenerateInvoiceOpen, setGenerateInvoiceOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<FinancePopupInterface>(FinancePopupInterface.Income);
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
            <BudgetTile description={'Budżet firmy'} name={'Aktualny budżet firmy'} value={roundTo2(budget * currency.value)} />
            {budgetHistoryData.slice(0, 2).map((history) => (
              <BudgetTile
                key={history._id}
                description={'Finanse'}
                value={history.expenseValue ? -1 * roundTo2(history.expenseValue * currency.value) : history.incomeValue ? roundTo2(history.incomeValue * currency.value) : 0}
                name={history.description}
              />
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
            <Heading>Waluty</Heading>
            {appCurrencies.map((currency) => (
              // <CurrencyBox key={currency}>
              <Heading key={currency} onClick={() => dispatch(getCurrencyValue(currency))}>
                {currency}
              </Heading>
              // </CurrencyBox>
            ))}
          </InfoBoxWrapper>
          <ButtonWrapper>
            <Button
              type={'button'}
              text={'Dodaj dochód'}
              onClick={() => {
                setPopupOpen(true);
                setPopupType(FinancePopupInterface.Income);
              }}
            />
            <Button
              type={'button'}
              text={'Dodaj wydatek'}
              onClick={() => {
                setPopupOpen(true);
                setPopupType(FinancePopupInterface.Expense);
              }}
            />
          </ButtonWrapper>
          <InfoWrapper onClick={() => setGenerateInvoiceOpen(true)}>
            <StatisticsHeading>Wygeneruj nową fakturę</StatisticsHeading>
            <ArrowIcon />
          </InfoWrapper>
        </ContentGridWrapper>
      </Content>
      <IncomeExpensePopup type={popupType} isOpen={isPopupOpen} setOpen={setPopupOpen} />
      <GenerateInvoice isOpen={isGenerateInvoiceOpen} setOpen={setGenerateInvoiceOpen} />
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

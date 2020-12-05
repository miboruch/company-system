import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import Chart from '../../molecules/Chart/Chart';
import { ExpenseInterface, IncomeDataInterface, IncomeInterface } from '../../../types/modelsTypes';
import { AppState, useAppDispatch } from '../../../store/store';
import { Heading } from '../../../styles/typography/typography';
import gsap from 'gsap';
import { contentAnimation } from '../../../animations/animations';

import { getIncomeExpenseInTimePeriod } from '../../../ducks/finances/income-expense/income-expense-creators';
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

  ${({ theme }) => theme.mq.hdReady} {
    height: 100vh;
    padding: 2rem;
  }
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

interface InfoBoxWrapper {
  noPadding?: boolean;
}

const InfoBoxWrapper = styled.div<InfoBoxWrapper>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  margin: 3rem 0;

  ${({ theme }) => theme.mq.hdReady} {
    //display: contents;
    border: 1px solid ${({ theme }) => theme.colors.impactGray};
    margin: 0;
    grid-area: currency;
    border-radius: 30px;
    padding: ${({ noPadding }) => (noPadding ? '0' : '3rem')};
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    flex-direction: row;
    height: 100%;
    grid-area: buttons;
    border-radius: 30px;
    border: 1px solid ${({ theme }) => theme.colors.impactGray};
  }
`;

const IncomeExpenseField = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid #e7e8e8;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2rem;
  display: grid;
  place-items: center;
  transition: background-color 0.3s ease;

  ${({ theme }) => theme.mq.hdReady} {
    width: 50%;
    margin-bottom: 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.menuBackground};
  }

  &:last-child {
    border-right: none;
  }
`;

const RightIncomeExpenseField = styled(IncomeExpenseField)`
  border-right: none;
`;

interface CurrencyBoxInterface {
  isActive: boolean;
}

const CurrencyBox = styled(IncomeExpenseField)<CurrencyBoxInterface>`
  width: calc(100% / 3);
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.menuBackground : theme.colors.white)};
`;

const FinancesPageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currency } = useSelector((state: AppState) => state.currency);
  const { lastIncomes, lastExpenses } = useSelector((state: AppState) => state.finances.incomeExpense);
  const { budget } = useSelector((state: AppState) => state.finances.budget);
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
    dispatch(getIncomeExpenseInTimePeriod({ daysBack, setData: setChartData }));
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
          <InfoBoxWrapper noPadding={true}>
            {appCurrencies.map((currencyName) => (
              <CurrencyBox key={currencyName} isActive={currencyName === currency.name} onClick={() => dispatch(getCurrencyValue(currencyName))}>
                <Heading>{currencyName}</Heading>
              </CurrencyBox>
            ))}
          </InfoBoxWrapper>
          <ButtonWrapper>
            <IncomeExpenseField
              onClick={() => {
                setPopupOpen(true);
                setPopupType(FinancePopupInterface.Income);
              }}
            >
              <StatisticsHeading>Dochód</StatisticsHeading>
            </IncomeExpenseField>
            <RightIncomeExpenseField
              onClick={() => {
                setPopupOpen(true);
                setPopupType(FinancePopupInterface.Expense);
              }}
            >
              <StatisticsHeading>Wydatek</StatisticsHeading>
            </RightIncomeExpenseField>
            {/*<Button*/}
            {/*  type={'button'}*/}
            {/*  text={'Dodaj dochód'}*/}
            {/*  onClick={() => {*/}
            {/*    setPopupOpen(true);*/}
            {/*    setPopupType(FinancePopupInterface.Income);*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<Button*/}
            {/*  type={'button'}*/}
            {/*  text={'Dodaj wydatek'}*/}
            {/*  onClick={() => {*/}
            {/*    setPopupOpen(true);*/}
            {/*    setPopupType(FinancePopupInterface.Expense);*/}
            {/*  }}*/}
            {/*/>*/}
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

export default FinancesPageContent;

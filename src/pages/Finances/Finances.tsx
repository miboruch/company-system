import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';

import GenerateInvoice from './components/GenerateInvoice/GenerateInvoice';
import BudgetTile from './components/BudgetTile/BudgetTile';
import BudgetHistoryList from './components/BudgetHistoryList/BudgetHistoryList';
import IncomeExpensePopup, { FinancePopupInterface } from './components/IncomeExpensePopup/IncomeExpensePopup';
import { fetchAllFinancesData } from 'ducks/finances/finances-creators';
import { AppState, useAppDispatch } from 'store/store';
import { GridWrapper, MenuTemplate, Chart } from 'components';
import { ExpenseInterface, IncomeDataInterface, IncomeInterface } from 'types';
import { currencyTypes, getCurrencyValue } from 'ducks/currency/currency-creators';
import { contentAnimation } from 'animations/animations';
import { roundTo2 } from 'utils/functions';
import { appCurrencies } from 'utils/config';
import { InfoWrapper, StatisticsHeading } from 'pages/Landing/components/LandingPageContent/LandingPageContent.styles';
import { getIncomeExpenseInTimePeriod } from 'ducks/finances/income-expense/income-expense-creators';

import { Heading } from 'styles';
import { ArrowIcon } from 'styles/iconStyles';
import {
  BudgetWrapper,
  ButtonWrapper,
  Content,
  CurrencyBox,
  IncomeExpenseField,
  InfoBoxWrapper,
  RightIncomeExpenseField
} from 'pages/Finances/Finances.styles';
import { ContentGridWrapper } from 'styles/HomePageContentGridStyles';

const Finances: React.FC = () => {
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

  const prepareExpenseValue = (history: IncomeInterface | ExpenseInterface) =>
    history.expenseValue
      ? -1 * roundTo2(history.expenseValue * currency.value)
      : history.incomeValue
      ? roundTo2(history.incomeValue * currency.value)
      : 0;
  const prepareCurrencyValue = (currencyName: currencyTypes) => () => dispatch(getCurrencyValue(currencyName));

  const handleIncomePopupOpen = () => {
    setPopupOpen(true);
    setPopupType(FinancePopupInterface.Income);
  };

  const handleExpensePopupOpen = () => {
    setPopupOpen(true);
    setPopupType(FinancePopupInterface.Expense);
  };

  const handleInvoiceOpen = () => setGenerateInvoiceOpen(true);

  useEffect(() => {
    contentAnimation(tl, contentRef);
  }, []);

  useEffect(() => {
    dispatch(getIncomeExpenseInTimePeriod({ daysBack, setData: setChartData }));
  }, [daysBack]);

  useEffect(() => {
    dispatch(fetchAllFinancesData());
  }, []);

  return (
    <MenuTemplate>
      <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Finanse'}>
        <Content>
          <ContentGridWrapper ref={contentRef} isFinancesPage={true}>
            <BudgetWrapper>
              <BudgetTile description={'Budżet firmy'} name={'Aktualny budżet firmy'} value={roundTo2(budget * currency.value)} />
              {budgetHistoryData.slice(0, 2).map((history) => (
                <BudgetTile
                  key={history._id}
                  description={'Finanse'}
                  value={prepareExpenseValue(history)}
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
                <CurrencyBox
                  key={currencyName}
                  isActive={currencyName === currency.name}
                  onClick={prepareCurrencyValue(currencyName)}
                >
                  <Heading>{currencyName}</Heading>
                </CurrencyBox>
              ))}
            </InfoBoxWrapper>
            <ButtonWrapper>
              <IncomeExpenseField onClick={handleIncomePopupOpen}>
                <StatisticsHeading>Dochód</StatisticsHeading>
              </IncomeExpenseField>
              <RightIncomeExpenseField onClick={handleExpensePopupOpen}>
                <StatisticsHeading>Wydatek</StatisticsHeading>
              </RightIncomeExpenseField>
            </ButtonWrapper>
            <InfoWrapper onClick={handleInvoiceOpen}>
              <StatisticsHeading>Wygeneruj nową fakturę</StatisticsHeading>
              <ArrowIcon />
            </InfoWrapper>
          </ContentGridWrapper>
        </Content>
        <IncomeExpensePopup type={popupType} isOpen={isPopupOpen} setOpen={setPopupOpen} />
        <GenerateInvoice isOpen={isGenerateInvoiceOpen} setOpen={setGenerateInvoiceOpen} />
      </GridWrapper>
    </MenuTemplate>
  );
};

export default Finances;

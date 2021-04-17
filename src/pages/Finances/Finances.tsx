import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';

import GenerateInvoice from './components/GenerateInvoice/GenerateInvoice';
import BudgetHistoryList from './components/BudgetHistoryList/BudgetHistoryList';
import IncomeExpensePopup, { FinancePopupInterface } from './components/IncomeExpensePopup/IncomeExpensePopup';
import { fetchAllFinancesData } from 'ducks/finances/finances-creators';
import { AppState, useAppDispatch } from 'store/store';
import { GridWrapper, MenuTemplate } from 'components';
import { ExpenseModel, IncomeModel } from 'types';
import { currencyTypes, getCurrencyValue } from 'ducks/currency/currency-creators';
import { contentAnimation } from 'animations/animations';
import { appCurrencies } from 'utils/config';
import { InfoWrapper, StatisticsHeading } from 'pages/Landing/Landing.styles';
import { getIncomeExpenseInTimePeriod } from 'ducks/finances/income-expense/income-expense-creators';

import { Heading } from 'styles';
import { ArrowIcon } from 'styles/iconStyles';
import {
  ButtonWrapper,
  Content,
  CurrencyBox,
  IncomeExpenseField,
  InfoBoxWrapper,
  RightIncomeExpenseField
} from 'pages/Finances/Finances.styles';
import { ContentGridWrapper } from 'styles/HomePageContentGridStyles';
import FinancesChart from './components/FinancesChart/FinancesChart';
import BudgetInfo from './components/BudgetInfo/BudgetInfo';

const Finances: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currency } = useSelector((state: AppState) => state.currency);
  const { lastIncomes, lastExpenses } = useSelector((state: AppState) => state.finances.incomeExpense);
  const { budget } = useSelector((state: AppState) => state.finances.budget);
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [isGenerateInvoiceOpen, setGenerateInvoiceOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<FinancePopupInterface>(FinancePopupInterface.Income);
  const [chartData, setChartData] = useState<Array<IncomeModel> | null>(null);
  const [daysBack, setDaysBackTo] = useState<number>(7);
  const [budgetHistoryData, setBudgetHistoryData] = useState<(IncomeModel | ExpenseModel)[]>([]);

  useEffect(() => {
    setBudgetHistoryData([...lastExpenses, ...lastIncomes]);
  }, [lastIncomes, lastExpenses]);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

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
            <BudgetInfo />
            <FinancesChart />
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

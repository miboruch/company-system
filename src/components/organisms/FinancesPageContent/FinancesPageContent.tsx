import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import Chart from '../../molecules/Chart/Chart';
import BudgetHistoryList from '../BudgetHistoryList/BudgetHistoryList';
import BudgetTile from '../../molecules/BudgetTile/BudgetTile';
import GenerateInvoice from '../GenerateInvoice/GenerateInvoice';
import IncomeExpensePopup, { FinancePopupInterface } from '../../molecules/IncomeExpensePopup/IncomeExpensePopup';

import { ExpenseInterface, IncomeDataInterface, IncomeInterface } from '../../../types/modelsTypes';
import { AppState, useAppDispatch } from '../../../store/store';
import { contentAnimation } from '../../../animations/animations';
import { roundTo2 } from '../../../utils/functions';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import { Heading } from '../../../styles/typography/typography';
import { getIncomeExpenseInTimePeriod } from '../../../ducks/finances/income-expense/income-expense-creators';
import { getCurrencyValue } from '../../../ducks/currency/currency-creators';
import { appCurrencies } from '../../../utils/config';
import { InfoWrapper, StatisticsHeading } from '../LandingPageContent/LandingPageContent.styles';
import { ArrowIcon } from '../../../styles/iconStyles';
import { Content, BudgetWrapper, InfoBoxWrapper, ButtonWrapper, IncomeExpenseField, RightIncomeExpenseField, CurrencyBox } from './FinancesPageContent.styles';

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

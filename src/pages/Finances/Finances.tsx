import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import FinancesChart from './components/FinancesChart/FinancesChart';
import BudgetInfo from './components/BudgetInfo/BudgetInfo';
import Currency from './components/Currency/Currency';
import GenerateInvoice from './components/GenerateInvoice/GenerateInvoice';
import BudgetHistoryList from './components/BudgetHistoryList/BudgetHistoryList';
import IncomeExpensePopup, { PopupType } from './components/IncomeExpensePopup/IncomeExpensePopup';
import { fetchAllFinancesData } from 'ducks/finances/finances-creators';
import { useAppDispatch } from 'store/store';
import { GridWrapper, MenuTemplate } from 'components';
import { contentAnimation } from 'animations/animations';
import { ExpenseModel, IncomeModel } from 'types';
import { InfoWrapper, StatisticsHeading } from 'pages/Landing/Landing.styles';

import { ArrowIcon } from 'styles/iconStyles';
import { ContentGridWrapper } from 'styles/HomePageContentGridStyles';
import { ButtonWrapper, Content, IncomeExpenseField, RightIncomeExpenseField } from 'pages/Finances/Finances.styles';

const Finances: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<PopupType>('income');
  const [finances, setFinances] = useState<(IncomeModel | ExpenseModel)[]>([]);

  const [isGenerateInvoiceOpen, setGenerateInvoiceOpen] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const handleIncomePopupOpen = () => {
    setPopupOpen(true);
    setPopupType('income');
  };

  const handleExpensePopupOpen = () => {
    setPopupOpen(true);
    setPopupType('expense');
  };

  const handleInvoiceOpen = () => setGenerateInvoiceOpen(true);

  useEffect(() => {
    contentAnimation(tl, contentRef);
  }, []);

  useEffect(() => {
    dispatch(fetchAllFinancesData());
  }, []);

  return (
    <MenuTemplate>
      <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Finanse'}>
        <Content>
          <ContentGridWrapper ref={contentRef} isFinancesPage={true}>
            <BudgetInfo setFinances={setFinances} />
            <FinancesChart />
            <BudgetHistoryList finances={finances} />
            <Currency />
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

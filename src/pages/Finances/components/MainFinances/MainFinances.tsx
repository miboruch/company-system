import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import gsap from 'gsap';

import BudgetInfo from './components/BudgetInfo/BudgetInfo';
import FinancesChart from './components/FinancesChart/FinancesChart';
import BudgetHistoryList from './components/BudgetHistoryList/BudgetHistoryList';
import Currency from './components/Currency/Currency';
import GenerateInvoice from '../GenerateInvoice/GenerateInvoice';
import IncomeExpensePopup, { PopupType } from '../IncomeExpensePopup/IncomeExpensePopup';
import { GridWrapper } from 'components';
import { contentAnimation } from 'animations/animations';
import { ExpenseModel, IncomeModel } from 'types';

import { InfoWrapper, StatisticsHeading } from 'pages/Landing/Landing.styles';
import { ButtonWrapper, Content, IncomeExpenseField, RightIncomeExpenseField } from './MainFinances.styles';
import { ContentGridWrapper } from 'styles/HomePageContentGridStyles';
import { ArrowIcon } from 'styles/iconStyles';

const MainFinances: React.FC = () => {
  const history = useHistory();
  const { url } = useRouteMatch();

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

  const handleInvoiceOpen = () => history.push(`${url}/invoice`);

  useEffect(() => {
    contentAnimation(tl, contentRef);
  }, []);

  return (
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
  );
};

export default MainFinances;

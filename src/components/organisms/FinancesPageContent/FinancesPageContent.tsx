import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import { TileWrapper } from '../LandingPageContent/LandingPageContent.styles';
import TaskTile from '../../molecules/TaskTile/TaskTile';
import Chart from '../../molecules/Chart/Chart';
import AttendanceList from '../AttendanceList/AttendanceList';
import { AttendanceInterface, IncomeDataInterface, TaskInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import gsap from 'gsap';
import { contentAnimation } from '../../../animations/animations';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import {getIncomeExpenseInTimePeriod} from '../../../actions/financeActions';
import BudgetHistoryList from '../BudgetHistoryList/BudgetHistoryList';

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

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const FinancesPageContent: React.FC<ConnectedProps> = ({ singleDayAttendance, allCompanyTasks, getIncomeExpenseInTimePeriod }) => {
  const [data, setData] = useState<Array<IncomeDataInterface> | null>(null);
  const [daysBack, setDaysBackTo] = useState<number>(7);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    contentAnimation(tl, contentRef);
  }, []);

  useEffect(() => {
    getIncomeExpenseInTimePeriod(daysBack, setData);
  }, [daysBack]);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Finanse'}>
      <Content>
        <ContentGridWrapper ref={contentRef} isFinancesPage={true}>
          <BudgetWrapper>
            {allCompanyTasks.slice(0, 3).map((task) => (
              <TaskTile task={task} />
            ))}
          </BudgetWrapper>
          <Chart
            xAxisDataKey={'createdDate'}
            secondBarDataKey={'expenseValue'}
            secondBarDataName={'Wydatek'}
            barDataKey={'incomeValue'}
            barDataName={'Dochód'}
            data={data}
            setDaysBack={setDaysBackTo}
            daysBack={daysBack}
          />
          <BudgetHistoryList />
          <InfoBoxWrapper>
            <p>PLN</p>
            <p>EUR</p>
            <p>USD</p>
            {/*<InformationBox title={'Pracownicy'} value={8} areaName={'employees'} />*/}
            {/*<InformationBox title={'Wykonane zadania'} value={12} areaName={'attendance'} />*/}
          </InfoBoxWrapper>
        </ContentGridWrapper>
      </Content>
    </GridWrapper>
  );
};

interface LinkStateProps {
  singleDayAttendance: AttendanceInterface[];
  allCompanyTasks: TaskInterface[];
}

interface LinkDispatchProps {
  getIncomeExpenseInTimePeriod: (daysBack: number, setData: (data: any[]) => void) => void;
}

const mapStateToProps = ({ attendanceReducer: { singleDayAttendance }, taskReducer: { allCompanyTasks } }: AppState): LinkStateProps => {
  return { singleDayAttendance, allCompanyTasks };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getIncomeExpenseInTimePeriod: bindActionCreators(getIncomeExpenseInTimePeriod, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancesPageContent);

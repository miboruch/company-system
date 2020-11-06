import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import { InfoBoxWrapper, TileWrapper } from '../LandingPageContent/LandingPageContent.styles';
import TaskTile from '../../molecules/TaskTile/TaskTile';
import Chart from '../../molecules/Chart/Chart';
import AttendanceList from '../AttendanceList/AttendanceList';
import InformationBox from '../../molecules/InformationBox/InformationBox';
import { AttendanceInterface, IncomeDataInterface, TaskInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import gsap from "gsap";
import { contentAnimation } from '../../../animations/animations';
import { getIncomeExpenseInTimePeriod } from '../../../utils/incomeExpenseAPI';

const Content = styled.div`
  width: 100%;
  height: 100%;
  grid-area: content;
  background-color: #fff;
`;

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const FinancesPageContent: React.FC<ConnectedProps> = ({ singleDayAttendance, allCompanyTasks }) => {
  const [data, setData] = useState<Array<IncomeDataInterface> | null>(null);
  const [daysBack, setDaysBackTo] = useState<number>(7);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    contentAnimation(tl, contentRef);
  }, []);

  useEffect(() => {
    (async () => {
      // await getIncomeExpenseInTimePeriod(token, daysBack, setData);
    })();
  }, [daysBack]);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Finanse'}>
      <Content>
        <ContentGridWrapper ref={contentRef}>
          <TileWrapper>
            {allCompanyTasks.slice(0, 3).map((task) => (
              <TaskTile task={task} />
            ))}
          </TileWrapper>
          <Chart
            xAxisDataKey={'createdDate'}
            secondBarDataKey={'expenseValue'}
            secondBarDataName={'Wydatek'}
            barDataKey={'incomeValue'}
            barDataName={'Dochód'}
            data={[]}
            setDaysBack={() => {}}
            daysBack={1}
          />
          <AttendanceList singleDayAttendance={singleDayAttendance} />
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

const mapStateToProps = ({ attendanceReducer: { singleDayAttendance }, taskReducer: { allCompanyTasks } }: AppState): LinkStateProps => {
  return { singleDayAttendance, allCompanyTasks };
};

export default connect(mapStateToProps)(FinancesPageContent);

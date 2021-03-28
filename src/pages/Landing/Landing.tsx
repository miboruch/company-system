import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import InfoBox from './components/InfoBox/InfoBox';
import BarChart from './components/BarChart/BarChart';
import AttendanceList from './components/AttendanceList/AttendanceList';
import AdminStatistics from './components/AdminStatistics/AdminStatistics';
import TaskTiles from './components/TaskTiles/TaskTiles';
import AttendancePopup from 'pages/Attendance/components/AttendancePopup/AttendancePopup';
import { MenuTemplate, Chart, GridWrapper } from 'components';
import { contentAnimation } from 'animations/animations';
import { AppState, useAppDispatch } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { AttendanceModel, IncomeModel } from 'types';
import { getIncomeExpenseInTimePeriod } from 'ducks/finances/income-expense/income-expense-creators';
import { getCompletedTasks, getTasksInTimePeriod, TaskPeriodInterface } from 'ducks/tasks/tasks-data/task-data-creators';

import { ArrowIcon } from 'styles/iconStyles';
import { ContentGridWrapper } from 'styles/HomePageContentGridStyles';
import { Content, InfoWrapper, StatisticsHeading } from './Landing.styles';

const Landing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: AppState) => state.auth.roles);

  const [data, setData] = useState<IncomeModel[] | null>(null);
  const [taskData, setTaskData] = useState<Array<TaskPeriodInterface> | null>(null);

  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceModel | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);
  const [areStatisticsOpen, setStatisticsOpen] = useState<boolean>(false);

  const [daysBack, setDaysBackTo] = useState<number>(7);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    contentAnimation(tl, contentRef);
  }, []);

  const handleStatisticsOpen = () => setStatisticsOpen(true);

  useEffect(() => {
    role === UserRole.Admin
      ? dispatch(getIncomeExpenseInTimePeriod({ daysBack, setData }))
      : dispatch(getTasksInTimePeriod({ daysBack, setData: setTaskData }));
  }, [daysBack]);

  useEffect(() => {
    dispatch(getCompletedTasks());
  }, []);

  const handleAttendanceClose = () => setAttendanceOpen(false);

  return (
    <MenuTemplate>
      <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Home'}>
        <Content>
          <ContentGridWrapper ref={contentRef}>
            <TaskTiles />
            {role === UserRole.Admin ? (
              <Chart
                xAxisDataKey={'createdDate'}
                secondBarDataKey={'expenseValue'}
                secondBarDataName={'Wydatek'}
                barDataKey={'incomeValue'}
                barDataName={'Dochód'}
                data={data}
                daysBack={daysBack}
                setDaysBack={setDaysBackTo}
              />
            ) : (
              <BarChart
                data={taskData}
                xAxisDataKey={'date'}
                barDataKey={'totalTasks'}
                barDataName={'Zadania'}
                setDaysBack={setDaysBackTo}
                daysBack={daysBack}
              />
            )}
            <AttendanceList setSelectedAttendance={setSelectedAttendance} setAttendanceOpen={setAttendanceOpen} />
            <InfoBox />
            <InfoWrapper onClick={handleStatisticsOpen}>
              <StatisticsHeading>Zobacz statystyki pracowników</StatisticsHeading>
              <ArrowIcon />
            </InfoWrapper>
          </ContentGridWrapper>
        </Content>
        <AttendancePopup
          attendance={selectedAttendance}
          isOpen={isAttendanceOpen}
          handleClose={handleAttendanceClose}
          date={new Date()}
        />
        <AdminStatistics isOpen={areStatisticsOpen} setOpen={setStatisticsOpen} />
      </GridWrapper>
    </MenuTemplate>
  );
};

export default Landing;

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter, useParams } from 'react-router-dom';

import { GridWrapper, Chart } from 'components';
import TaskTile from './components/TaskTile/TaskTile';
import BarChart from './components/BarChart/BarChart';
import AttendanceList from './components/AttendanceList/AttendanceList';
import AdminStatistics from './components/AdminStatistics/AdminStatistics';
import InformationBox from './components/InformationBox/InformationBox';
import AttendancePopup from 'pages/Attendance/components/AttendancePageContent/components/AttendancePopup/AttendancePopup';

import { AppState, useAppDispatch } from 'store/store';
import { AttendanceInterface, IncomeDataInterface, TaskInterface } from 'types/modelsTypes';
import { UserRole } from 'ducks/auth/roles/roles';
import { contentAnimation } from 'animations/animations';
import { redirectToTask } from 'ducks/tasks/tasks-toggle/tasks-toggle-creators';
import { ContentGridWrapper } from 'styles/HomePageContentGridStyles';
import { getSingleDayAttendance } from 'ducks/attendance/attendance-data/attendance-data-creators';
import {
  getCompanyTasks,
  getCompletedTasks,
  getEmployeeTasks,
  getTasksInTimePeriod,
  TaskPeriodInterface
} from 'ducks/tasks/tasks-data/task-data-creators';
import { getIncomeExpenseInTimePeriod } from 'ducks/finances/income-expense/income-expense-creators';
import { ArrowIcon } from 'styles/iconStyles';
import { getAllCompanyEmployees } from 'ducks/employees/employees-data/employees-data-creators';
import { Content, InfoBoxWrapper, InfoWrapper, StatisticsHeading, TileWrapper } from './LandingPageContent.styles';
import { getAllAppUsers } from 'ducks/users/all-users-creators';

const LandingPageContent: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { employeeData } = useSelector((state: AppState) => state.auth.data);
  const { allCompanyTasks, completedTasks } = useSelector((state: AppState) => state.tasks.taskData);
  const { companyEmployeesCounter } = useSelector((state: AppState) => state.employees.employeesData);
  const { singleDayAttendance } = useSelector((state: AppState) => state.attendance.attendanceData);

  const [data, setData] = useState<Array<IncomeDataInterface> | null>(null);
  const [taskData, setTaskData] = useState<Array<TaskPeriodInterface> | null>(null);
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceInterface | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);
  const [areStatisticsOpen, setStatisticsOpen] = useState<boolean>(false);

  const [daysBack, setDaysBackTo] = useState<number>(7);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    contentAnimation(tl, contentRef);
    dispatch(getCompanyTasks());
  }, []);

  useEffect(() => {
    role === UserRole.User && employeeData && dispatch(getEmployeeTasks());
  }, [employeeData]);

  const handleStatisticsOpen = () => setStatisticsOpen(true);
  const handleTaskClick = (task: TaskInterface) => () => dispatch(redirectToTask(history, task, id));

  useEffect(() => {
    role === UserRole.Admin
      ? dispatch(getIncomeExpenseInTimePeriod({ daysBack, setData }))
      : dispatch(getTasksInTimePeriod({ daysBack, setData: setTaskData }));
  }, [daysBack]);

  useEffect(() => {
    dispatch(getSingleDayAttendance(new Date()));
    dispatch(getCompletedTasks());
    dispatch(getAllCompanyEmployees());
    role === UserRole.Admin && dispatch(getAllAppUsers());
  }, []);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Home'}>
      <Content>
        <ContentGridWrapper ref={contentRef}>
          <TileWrapper>
            {allCompanyTasks.slice(0, 3).map((task) => (
              <TaskTile key={task._id} task={task} onClick={handleTaskClick(task)} />
            ))}
          </TileWrapper>
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
          <AttendanceList
            singleDayAttendance={singleDayAttendance}
            setSelectedAttendance={setSelectedAttendance}
            setAttendanceOpen={setAttendanceOpen}
          />
          <InfoBoxWrapper>
            <InformationBox title={'Pracownicy'} value={companyEmployeesCounter} areaName={'employees'} chartAnimationDelay={0} />
            <InformationBox
              title={'Wykonane zadania (30d)'}
              value={completedTasks}
              areaName={'attendance'}
              chartAnimationDelay={800}
            />
          </InfoBoxWrapper>
          <InfoWrapper onClick={handleStatisticsOpen}>
            <StatisticsHeading>Zobacz statystyki pracowników</StatisticsHeading>
            <ArrowIcon />
          </InfoWrapper>
        </ContentGridWrapper>
      </Content>
      <AttendancePopup attendance={selectedAttendance} isOpen={isAttendanceOpen} setOpen={setAttendanceOpen} date={new Date()} />
      <AdminStatistics isOpen={areStatisticsOpen} setOpen={setStatisticsOpen} />
    </GridWrapper>
  );
};

export default withRouter(LandingPageContent);

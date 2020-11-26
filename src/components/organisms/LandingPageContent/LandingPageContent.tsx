import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import gsap from 'gsap';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Content, InfoBoxWrapper, InfoWrapper, StatisticsHeading, TileWrapper } from './LandingPageContent.styles';
import TaskTile from '../../molecules/TaskTile/TaskTile';
import { AppState, useAppDispatch } from '../../../store/test-store';
import { AttendanceInterface, EmployeeDataInterface, IncomeDataInterface, TaskInterface } from '../../../types/modelsTypes';
import Chart from '../../molecules/Chart/Chart';
import AttendanceList from '../AttendanceList/AttendanceList';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import InformationBox from '../../molecules/InformationBox/InformationBox';
import { contentAnimation } from '../../../animations/animations';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getSingleDayAttendance } from '../../../ducks/attendance/attendance-data/attendance-data-creators';
import { getCompanyTasks, getCompletedTasks } from '../../../ducks/tasks/tasks-data/task-data-creators';
import { redirectToTask } from '../../../ducks/tasks/tasks-toggle/tasks-toggle-creators';
import AttendancePopup from '../../molecules/AttendancePopup/AttendancePopup';
import { getIncomeExpenseInTimePeriod } from '../../../actions/financeActions';
import { ArrowIcon } from '../../../styles/iconStyles';
import { getAllCompanyEmployees } from '../../../ducks/employees/employees-data/employees-data-creators';
import AdminStatistics from '../AdminStatistics/AdminStatistics';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';

type ConnectedProps = LinkDispatchProps & RouteComponentProps<any>;

const LandingPageContent: React.FC<ConnectedProps> = ({ history, getIncomeExpenseInTimePeriod }) => {
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { allCompanyTasks, completedTasks } = useSelector((state: AppState) => state.tasks.taskData);
  const { allCompanyEmployees, companyEmployeesCounter } = useSelector((state: AppState) => state.employees.employeesData);
  const { singleDayAttendance } = useSelector((state: AppState) => state.attendance.attendanceData);

  const [text, setText] = useState<string>('');
  const [data, setData] = useState<Array<IncomeDataInterface> | null>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  useEffect(() => {
    role === UserRole.Admin && getIncomeExpenseInTimePeriod(daysBack, setData);
  }, [daysBack]);

  useEffect(() => {
    dispatch(getSingleDayAttendance(new Date()));
    dispatch(getCompletedTasks());
    dispatch(getAllCompanyEmployees());
  }, []);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Home'}>
      <Content>
        {/*TODO: make another grid in this component - only hdReady resolutions */}
        <ContentGridWrapper ref={contentRef}>
          <TileWrapper>
            {allCompanyTasks.slice(0, 3).map((task) => (
              <TaskTile key={task._id} task={task} onClick={() => dispatch(redirectToTask(history, task))} />
            ))}
          </TileWrapper>
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
          <AttendanceList singleDayAttendance={singleDayAttendance} setSelectedAttendance={setSelectedAttendance} setAttendanceOpen={setAttendanceOpen} />
          <InfoBoxWrapper>
            <InformationBox title={'Pracownicy'} value={companyEmployeesCounter} areaName={'employees'} chartAnimationDelay={0} />
            <InformationBox title={'Wykonane zadania (30d)'} value={completedTasks} areaName={'attendance'} chartAnimationDelay={800} />
          </InfoBoxWrapper>
          <InfoWrapper onClick={() => setStatisticsOpen(true)}>
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

interface LinkDispatchProps {
  getIncomeExpenseInTimePeriod: (daysBack: number, setData: (data: any[]) => void) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getIncomeExpenseInTimePeriod: bindActionCreators(getIncomeExpenseInTimePeriod, dispatch)
  };
};

const LandingPageContentWithRouter = withRouter(LandingPageContent);

export default connect(null, mapDispatchToProps)(LandingPageContentWithRouter);

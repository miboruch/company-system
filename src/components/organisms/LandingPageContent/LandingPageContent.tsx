import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import gsap from 'gsap';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Content, InfoBoxWrapper, InfoWrapper, StatisticsHeading, TileWrapper } from './LandingPageContent.styles';
import TaskTile from '../../molecules/TaskTile/TaskTile';
import { AppState } from '../../../store/test-store';
import { AttendanceInterface, EmployeeDataInterface, IncomeDataInterface, TaskInterface } from '../../../types/modelsTypes';
import Chart from '../../molecules/Chart/Chart';
import AttendanceList from '../AttendanceList/AttendanceList';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import InformationBox from '../../molecules/InformationBox/InformationBox';
import { contentAnimation } from '../../../animations/animations';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getSingleDayAttendance } from '../../../actions/attendanceActions';
import { getCompanyTasks, getCompletedTasks, redirectToTask } from '../../../actions/taskActions';
import AttendancePopup from '../../molecules/AttendancePopup/AttendancePopup';
import { getIncomeExpenseInTimePeriod } from '../../../actions/financeActions';
import { ArrowIcon } from '../../../styles/iconStyles';
import { getAllCompanyEmployees } from '../../../actions/employeeActions';
import AdminStatistics from '../AdminStatistics/AdminStatistics';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';

type ConnectedProps = LinkStateProps & LinkDispatchProps & RouteComponentProps<any>;

const LandingPageContent: React.FC<ConnectedProps> = ({
  history,
  singleDayAttendance,
  getSingleDayAttendance,
  allCompanyTasks,
  getCompanyTasks,
  redirectToTask,
  getCompletedTasks,
  completedTasks,
  getIncomeExpenseInTimePeriod,
  companyEmployeesCounter,
  allCompanyEmployees,
  getAllCompanyEmployees
}) => {
  const { role } = useSelector((state: AppState) => state.auth.roles);
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
    getCompanyTasks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  useEffect(() => {
    role === UserRole.Admin && getIncomeExpenseInTimePeriod(daysBack, setData);
  }, [daysBack]);

  useEffect(() => {
    getSingleDayAttendance(new Date());
    getCompletedTasks();
    getAllCompanyEmployees();
  }, []);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Home'}>
      <Content>
        {/*TODO: make another grid in this component - only hdReady resolutions */}
        <ContentGridWrapper ref={contentRef}>
          <TileWrapper>
            {allCompanyTasks.slice(0, 3).map((task) => (
              <TaskTile key={task._id} task={task} onClick={() => redirectToTask(history, task)} />
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

interface LinkStateProps {
  singleDayAttendance: AttendanceInterface[];
  allCompanyTasks: TaskInterface[];
  completedTasks: number;
  companyEmployeesCounter: number;
  allCompanyEmployees: EmployeeDataInterface[];
}

interface LinkDispatchProps {
  getSingleDayAttendance: (date?: Date) => void;
  getCompanyTasks: () => void;
  redirectToTask: (history: History, task: TaskInterface) => void;
  getCompletedTasks: () => void;
  getIncomeExpenseInTimePeriod: (daysBack: number, setData: (data: any[]) => void) => void;
  getAllCompanyEmployees: () => void;
}

const mapStateToProps = ({
  attendanceReducer: { singleDayAttendance },
  taskReducer: { allCompanyTasks, completedTasks },
  employeeReducer: { allCompanyEmployees, companyEmployeesCounter }
}: AppState): LinkStateProps => {
  return { singleDayAttendance, allCompanyTasks, completedTasks, allCompanyEmployees, companyEmployeesCounter };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getSingleDayAttendance: bindActionCreators(getSingleDayAttendance, dispatch),
    getCompanyTasks: bindActionCreators(getCompanyTasks, dispatch),
    redirectToTask: bindActionCreators(redirectToTask, dispatch),
    getCompletedTasks: bindActionCreators(getCompletedTasks, dispatch),
    getIncomeExpenseInTimePeriod: bindActionCreators(getIncomeExpenseInTimePeriod, dispatch),
    getAllCompanyEmployees: bindActionCreators(getAllCompanyEmployees, dispatch)
  };
};

const LandingPageContentWithRouter = withRouter(LandingPageContent);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContentWithRouter);

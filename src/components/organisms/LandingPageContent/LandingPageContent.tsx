import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import gsap from 'gsap';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Content, Header, TileWrapper, InfoBoxWrapper } from './LandingPageContent.styles';
import TaskTile from '../../molecules/TaskTile/TaskTile';
import { AppState } from '../../../reducers/rootReducer';
import { AttendanceInterface, IncomeDataInterface, TaskInterface } from '../../../types/modelsTypes';
import Chart from '../../molecules/Chart/Chart';
import AttendanceList from '../AttendanceList/AttendanceList';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import InformationBox from '../../molecules/InformationBox/InformationBox';
import { getIncomeExpenseInTimePeriod } from '../../../utils/incomeExpenseAPI';
import { contentAnimation } from '../../../animations/animations';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getSingleDayAttendance } from '../../../actions/attendanceActions';
import { getCompanyTasks, redirectToTask } from '../../../actions/taskActions';
import DeletePopup from '../../molecules/DeletePopup/DeletePopup';
import AttendancePopup from '../../molecules/AttendancePopup/AttendancePopup';

type ConnectedProps = LinkStateProps & LinkDispatchProps & RouteComponentProps<any>;

const LandingPageContent: React.FC<ConnectedProps> = ({ history, token, singleDayAttendance, getSingleDayAttendance, allCompanyTasks, getCompanyTasks, redirectToTask }) => {
  const [text, setText] = useState<string>('');
  const [data, setData] = useState<Array<IncomeDataInterface> | null>(null);
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceInterface | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);

  const [daysBack, setDaysBackTo] = useState<number>(20);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    contentAnimation(tl, contentRef);
    allCompanyTasks.length === 0 && getCompanyTasks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  useEffect(() => {
    (async () => {
      await getIncomeExpenseInTimePeriod(token, daysBack, setData);
    })();
  }, [daysBack]);

  useEffect(() => {
    getSingleDayAttendance(new Date('2020-10-07T18:39:30.001Z'));
  }, []);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Home'}>
      <Content>
        {/*TODO: make another grid in this component - only hdReady resolutions */}
        <ContentGridWrapper ref={contentRef}>
          <TileWrapper>
            {allCompanyTasks.slice(0, 3).map((task) => (
              <TaskTile key={task._id} isCompleted={task.isCompleted} name={task.name} onClick={() => redirectToTask(history, task)} />
            ))}
          </TileWrapper>
          <Chart
            xAxisDataKey={'createdDate'}
            secondBarDataKey={'expenseValue'}
            secondBarDataName={'Wydatek'}
            barDataKey={'incomeValue'}
            barDataName={'Dochód'}
            data={data}
            setDaysBack={setDaysBackTo}
          />
          <AttendanceList singleDayAttendance={singleDayAttendance} setSelectedAttendance={setSelectedAttendance} setAttendanceOpen={setAttendanceOpen} />
          <InfoBoxWrapper>
            <InformationBox title={'Pracownicy'} value={8} areaName={'employees'} />
            <InformationBox title={'Wykonane zadania'} value={12} areaName={'attendance'} />
          </InfoBoxWrapper>
        </ContentGridWrapper>
      </Content>
      {/*<DeletePopup isOpen={!!selectedAttendance} setOpen={(is:boolean)=> {}} headerText={'test'} text={'test'} callback={() => {}}/>*/}
      <AttendancePopup attendance={selectedAttendance} isOpen={isAttendanceOpen} setOpen={setAttendanceOpen} />
    </GridWrapper>
  );
};

interface LinkStateProps {
  token: string | null;
  singleDayAttendance: AttendanceInterface[];
  allCompanyTasks: TaskInterface[];
}

interface LinkDispatchProps {
  getSingleDayAttendance: (date?: Date) => void;
  getCompanyTasks: () => void;
  redirectToTask: (history: History, task: TaskInterface) => void;
}

const mapStateToProps = ({ authenticationReducer: { token }, attendanceReducer: { singleDayAttendance }, taskReducer: { allCompanyTasks } }: AppState): LinkStateProps => {
  return { token, singleDayAttendance, allCompanyTasks };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getSingleDayAttendance: bindActionCreators(getSingleDayAttendance, dispatch),
    getCompanyTasks: bindActionCreators(getCompanyTasks, dispatch),
    redirectToTask: bindActionCreators(redirectToTask, dispatch)
  };
};

const LandingPageContentWithRouter = withRouter(LandingPageContent);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContentWithRouter);

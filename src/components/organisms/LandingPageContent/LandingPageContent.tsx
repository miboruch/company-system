import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import gsap from 'gsap';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Content, Header, TileWrapper, InfoBoxWrapper } from './LandingPageContent.styles';
import TaskTile from '../../molecules/TaskTile/TaskTile';
import { AppState } from '../../../reducers/rootReducer';
import { AttendanceInterface, IncomeDataInterface } from '../../../types/modelsTypes';
import BarChart from '../../molecules/BarChart/BarChart';
import AttendanceList from '../AttendanceList/AttendanceList';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import InformationBox from '../../molecules/InformationBox/InformationBox';
import { getIncomeExpenseInTimePeriod } from '../../../utils/incomeExpenseAPI';
import { contentAnimation } from '../../../animations/animations';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getSingleDayAttendance } from '../../../actions/attendanceActions';

type ConnectedProps = LinkStateProps & LinkDispatchProps;

const LandingPageContent: React.FC<ConnectedProps> = ({ token, singleDayAttendance, getSingleDayAttendance }) => {
  const [text, setText] = useState<string>('');
  const [data, setData] = useState<Array<IncomeDataInterface> | null>(null);
  const [daysBack, setDaysBackTo] = useState<number>(20);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    contentAnimation(tl, contentRef);
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
    getSingleDayAttendance(new Date());
  }, []);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Home'}>
      <Content>
        {/*TODO: make another grid in this component - only hdReady resolutions */}
        <ContentGridWrapper ref={contentRef}>
          <TileWrapper>
            <TaskTile isCompleted={false} name={'Wykonanie usługi przycięcia drzew'} />
            <TaskTile isCompleted={false} name={'Wykonanie usługi przycięcia drzew'} />
            <TaskTile isCompleted={false} name={'Wykonanie usługi przycięcia drzew'} />
          </TileWrapper>
          <BarChart
            xAxisDataKey={'createdDate'}
            secondBarDataKey={'expenseValue'}
            secondBarDataName={'Wydatek'}
            barDataKey={'incomeValue'}
            barDataName={'Dochód'}
            data={data}
            setDaysBack={setDaysBackTo}
          />
          <AttendanceList singleDayAttendance={singleDayAttendance} />
          <InfoBoxWrapper>
            <InformationBox title={'Pracownicy'} value={8} areaName={'employees'} />
            <InformationBox title={'Wykonane zadania'} value={12} areaName={'attendance'} />
          </InfoBoxWrapper>
        </ContentGridWrapper>
      </Content>
    </GridWrapper>
  );
};

interface LinkStateProps {
  token: string | null;
  singleDayAttendance: AttendanceInterface[];
}

interface LinkDispatchProps {
  getSingleDayAttendance: (date?: Date) => void;
}

const mapStateToProps = ({ authenticationReducer: { token }, attendanceReducer: { singleDayAttendance } }: AppState): LinkStateProps => {
  return { token, singleDayAttendance };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getSingleDayAttendance: bindActionCreators(getSingleDayAttendance, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContent);

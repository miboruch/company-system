import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import InfoBox from './components/InfoBox/InfoBox';
import AttendanceList from './components/AttendanceList/AttendanceList';
import AdminStatistics from './components/AdminStatistics/AdminStatistics';
import TaskTiles from './components/TaskTiles/TaskTiles';
import AttendancePopup from 'pages/Attendance/components/AttendancePopup/AttendancePopup';
import { MenuTemplate, GridWrapper } from 'components';
import { contentAnimation } from 'animations/animations';
import { useAppDispatch } from 'store/store';
import { AttendanceModel } from 'types';
import { getCompletedTasks } from 'ducks/tasks/tasks-data/task-data-creators';

import { ArrowIcon } from 'styles/iconStyles';
import { ContentGridWrapper } from 'styles/HomePageContentGridStyles';
import { Content, InfoWrapper, StatisticsHeading } from './Landing.styles';
import Charts from './components/Charts/Charts';

const Landing: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceModel | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);
  const [areStatisticsOpen, setStatisticsOpen] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    contentAnimation(tl, contentRef);
  }, []);

  const handleStatisticsOpen = () => setStatisticsOpen(true);

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
            <Charts />
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

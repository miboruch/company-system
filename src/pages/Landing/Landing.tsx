import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import InfoBox from './components/InfoBox/InfoBox';
import Charts from './components/Charts/Charts';
import AttendanceList from './components/AttendanceList/AttendanceList';
import AdminStatistics from './components/AdminStatistics/AdminStatistics';
import TaskTiles from './components/TaskTiles/TaskTiles';
import AttendancePopup from 'pages/Attendance/components/AttendancePopup/AttendancePopup';
import { MenuTemplate, GridWrapper } from 'components';
import { contentAnimation } from 'animations/animations';
import { AttendanceModel } from 'types';

import { ArrowIcon } from 'styles/iconStyles';
import { ContentGridWrapper } from 'styles/HomePageContentGridStyles';
import { Content, InfoWrapper, StatisticsHeading } from './Landing.styles';

const Landing: React.FC = () => {
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceModel | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);
  const [areStatisticsOpen, setStatisticsOpen] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    contentAnimation(tl, contentRef);
  }, []);

  const handleStatisticsOpen = (isOpen: boolean) => () => setStatisticsOpen(isOpen);
  const handleAttendanceOpen = (isOpen: boolean) => () => setAttendanceOpen(isOpen);

  return (
    <MenuTemplate>
      <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Home'}>
        <Content>
          <ContentGridWrapper ref={contentRef}>
            <TaskTiles />
            <Charts />
            <AttendanceList setSelectedAttendance={setSelectedAttendance} handleAttendanceOpen={handleAttendanceOpen(true)} />
            <InfoBox />
            <InfoWrapper onClick={handleStatisticsOpen(true)}>
              <StatisticsHeading>Zobacz statystyki pracowników</StatisticsHeading>
              <ArrowIcon />
            </InfoWrapper>
          </ContentGridWrapper>
        </Content>
        <AttendancePopup attendance={selectedAttendance} isOpen={isAttendanceOpen} handleClose={handleAttendanceOpen(false)} />
        <AdminStatistics isOpen={areStatisticsOpen} handleClose={handleStatisticsOpen(false)} />
      </GridWrapper>
    </MenuTemplate>
  );
};

export default Landing;

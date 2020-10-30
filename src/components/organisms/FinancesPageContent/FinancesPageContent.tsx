import React from 'react';
import styled from 'styled-components';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import { InfoBoxWrapper, TileWrapper } from '../LandingPageContent/LandingPageContent.styles';
import TaskTile from '../../molecules/TaskTile/TaskTile';
import BarChart from '../../molecules/BarChart/BarChart';
import AttendanceList from '../AttendanceList/AttendanceList';
import InformationBox from '../../molecules/InformationBox/InformationBox';

const Content = styled.div`
  width: 100%;
  height: 100%;
  grid-area: content;
  background-color: #fff;
`;

interface Props {}

const FinancesPageContent: React.FC<Props> = () => {
  return (
    <GridWrapper mobilePadding={false} onlyHeader={true} pageName={'Finanse'}>
      <Content>
        <ContentGridWrapper>
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
            data={[]}
            setDaysBack={() => {}}
          />
          <AttendanceList />
          <InfoBoxWrapper>
            <InformationBox title={'Pracownicy'} value={8} areaName={'employees'} />
            <InformationBox title={'Wykonane zadania'} value={12} areaName={'attendance'} />
          </InfoBoxWrapper>
        </ContentGridWrapper>
      </Content>
    </GridWrapper>
  );
};

export default FinancesPageContent;

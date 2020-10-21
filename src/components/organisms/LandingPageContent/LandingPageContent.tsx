import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import gsap from 'gsap';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Content, Header, TileWrapper, InfoBoxWrapper } from './LandingPageContent.styles';
import { Title } from '../../../styles/sharedStyles';
import TaskTile from '../../molecules/TaskTile/TaskTile';
import { AppState } from '../../../reducers/rootReducer';
import { IncomeDataInterface } from '../../../types/modelsTypes';
import BarChart from '../../molecules/BarChart/BarChart';
import AttendanceList from '../AttendanceList/AttendanceList';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';
import InformationBox from '../../molecules/InformationBox/InformationBox';
import { getIncomeExpenseInTimePeriod } from '../../../utils/incomeExpenseAPI';

const LandingPageContent: React.FC<LinkStateProps> = ({ token }) => {
  const [text, setText] = useState<string>('');
  const [data, setData] = useState<Array<IncomeDataInterface> | null>(null);
  const [daysBack, setDaysBackTo] = useState<number>(20);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    const content: HTMLDivElement | null = contentRef.current;

    if (content) {
      gsap.set([...content.children], { autoAlpha: 0 });

      tl.fromTo(content.children, { autoAlpha: 0, y: '+=30' }, { autoAlpha: 1, y: 0, stagger: 0.2 });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  useEffect(() => {
    (async () => {
      await getIncomeExpenseInTimePeriod(token, daysBack, setData);
    })();
  }, [daysBack]);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true}>
      <Title>Home</Title>
      <Header />
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

interface LinkStateProps {
  token: string | null;
}

const mapStateToProps = ({ authenticationReducer: { token } }: AppState): LinkStateProps => {
  return { token };
};

export default connect(mapStateToProps)(LandingPageContent);

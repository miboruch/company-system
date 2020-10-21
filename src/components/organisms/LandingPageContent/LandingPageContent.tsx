import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import gsap from 'gsap';
import Input from '../../atoms/Input/Input';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Content, List, Header, Test, TileWrapper } from './LandingPageContent.styles';
import { Title } from '../../../styles/sharedStyles';
import TaskTile from '../../molecules/TaskTile/TaskTile';
import { AppState } from '../../../reducers/rootReducer';
import { API_URL } from '../../../utils/config';
import { IncomeDataInterface } from '../../../types/modelsTypes';
import BarChart from '../../molecules/BarChart/BarChart';
import ListBox from '../../molecules/ListBox/ListBox';
import AttendanceList from '../AttendanceList/AttendanceList';
import { ContentGridWrapper } from '../../../styles/HomePageContentGridStyles';

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
      try {
        const { data } = await axios.get(`${API_URL}/income/get-last-incomes?company_id=5f79a8e665bf093c1f418ee9&daysBack=${daysBack}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setData(data.map((income: IncomeDataInterface) => ({ ...income, createdDate: new Date(income.createdDate).toLocaleDateString() })));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [daysBack]);

  return (
    <GridWrapper onlyHeader={true}>
      <Title>Home</Title>
      <Header />
      {/*<List />*/}
      <Content>
        {/*TODO: make another grid in this component - only hdReady resolutions */}
        <ContentGridWrapper ref={contentRef}>
          <TileWrapper>
            <TaskTile isCompleted={false} name={'Wykonanie usługi przycięcia drzew'} />
            <TaskTile isCompleted={false} name={'Wykonanie usługi przycięcia drzew'} />
            <TaskTile isCompleted={false} name={'Wykonanie usługi przycięcia drzew'} />
          </TileWrapper>
          <BarChart xAxisDataKey={'createdDate'} barDataKey={'incomeValue'} barDataName={'Dochód'} data={data} setDaysBack={setDaysBackTo} />
          <AttendanceList />
          <ListBox
            name={'Roman Boruch'}
            topDescription={'09-10-1987'}
            bottomDescription={'roman.boruch@gmail.com'}
            callback={() => console.log('roman')}
            isChecked={true}
            isCompanyBox={true}
          />
          <Input onChange={handleChange} name={'name'} labelText={'Imię'} type={'string'} value={text} required={true} />
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

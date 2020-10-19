import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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

const LandingPageContent: React.FC<LinkStateProps> = ({ token }) => {
  const [text, setText] = useState<string>('');
  const [data, setData] = useState<Array<IncomeDataInterface> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/income/get-last-incomes?company_id=5f79a8e665bf093c1f418ee9&daysBack=30`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(data);
        setData(data.map((income: IncomeDataInterface) => ({ ...income, createdDate: new Date(income.createdDate).toLocaleDateString() })));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <GridWrapper onlyHeader={true}>
      <Title>Home</Title>
      <Header />
      {/*<List />*/}
      <Content>
        {/*TODO: make another grid in this component - only hdReady resolutions */}
        <TileWrapper>
          <TaskTile isCompleted={false} name={'Wykonanie usługi przycięcia drzew'} />
          <TaskTile isCompleted={false} name={'Wykonanie usługi przycięcia drzew'} />
          <TaskTile isCompleted={false} name={'Wykonanie usługi przycięcia drzew'} />
        </TileWrapper>
        <BarChart xAxisDataKey={'createdDate'} barDataKey={'incomeValue'} barDataName={'Dochód'} data={data} />
        <ListBox
          name={'Mariusz Pawelski'}
          date={'08/06/1998'}
          bottomDescription={'mariusz.pawelski@gmail.com'}
          callback={() => console.log('attendance clicked')}
          // isEmpty={true}
          isChecked={false}
        />
        <Test>wdqwdqw</Test>
        <Input onChange={handleChange} name={'name'} labelText={'Imię'} type={'string'} value={text} required={true} />
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

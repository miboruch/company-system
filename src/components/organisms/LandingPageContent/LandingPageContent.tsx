import React, { useState } from 'react';
import Input from '../../atoms/Input/Input';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Content, List, Header, Test } from './LandingPageContent.styles';
import { Title } from '../../../styles/sharedStyles';

interface Props {}

const LandingPageContent: React.FC<Props> = () => {
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <GridWrapper>
      <Title>LandingPageContent</Title>
      <List>
        <p>eqwe</p>
      </List>
      <Header />
      <Test>wdqwdqw</Test>
      <Content>
        <Input onChange={handleChange} name={'name'} labelText={'Imię'} type={'string'} value={text} required={true} />
      </Content>
    </GridWrapper>
  );
};

export default LandingPageContent;

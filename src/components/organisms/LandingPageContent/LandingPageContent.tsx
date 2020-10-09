import React, { useState } from 'react';
import Input from '../../atoms/Input/Input';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Content, Title, List, Header, Test } from './LandingPageContent.styles';

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
        <Input onChange={handleChange} name={'name'} labelText={'Imię'} value={text} required={true} />
      </Content>
    </GridWrapper>
  );
};

export default LandingPageContent;

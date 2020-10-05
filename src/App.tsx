import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Input from './components/atoms/Input/Input';
import Layout from './components/Layout';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  place-items: center;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100px auto;
  grid-template-areas: 'name header' 'list content';
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
  grid-area: content;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  grid-area: name;
`;

const List = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
  grid-area: list;
`;

const Header = styled.header`
  width: 100%;
  height: 100%;
  background-color: blue;
  grid-area: header;
`;

function App() {
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <Layout>
      <StyledWrapper>
        <Title>hello</Title>
        <List>asd</List>
        <Header />
        <Content>
          <Input onChange={handleChange} name={'name'} labelText={'Imię'} value={text} required={true} />
        </Content>
      </StyledWrapper>

      {/*<div style={{ display: 'flex', flexDirection: 'column' }}>*/}
      {/*  <p>Hello</p>*/}
      {/*  <p>again</p>*/}
      {/*</div>*/}
    </Layout>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Input from './components/atoms/Input/Input';
import Layout from './components/Layout';

function App() {
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <Layout>
      <Input onChange={handleChange} name={'name'} labelText={'Imię'} value={text} required={true} />
    </Layout>
  );
}

export default App;

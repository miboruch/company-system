import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './components/atoms/Input/Input';

function App() {
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <div className='App'>
      <Input onChange={handleChange} name={'name'} labelText={'Imię'} value={text} required={true} />
    </div>
  );
}

export default App;

import React from 'react';
import ColorHash from 'color-hash';

import { getNameShortcut } from 'utils/user';

import { Wrapper } from './avatar.styles';

interface Props {
  name: string;
  onClick?: () => void;
}

const Avatar: React.FC<Props> = ({ name, onClick }) => {
  const colorHash = new ColorHash();

  const color = colorHash.hex(name);
  const nameLetters = getNameShortcut(name);

  return (
    <Wrapper color={color} onClick={onClick}>
      {nameLetters}
    </Wrapper>
  );
};

export default Avatar;

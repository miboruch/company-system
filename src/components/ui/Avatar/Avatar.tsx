import React from 'react';
import ColorHash from 'color-hash';

import { getNameShortcut } from 'utils/user';

import { Wrapper } from './avatar.styles';

interface Props {
  name: string;
}

const Avatar: React.FC<Props> = ({ name }) => {
  const colorHash = new ColorHash();

  const color = colorHash.hex(name);
  const nameLetters = getNameShortcut(name);

  return <Wrapper color={color}>{nameLetters}</Wrapper>;
};

export default Avatar;

import React from 'react';
import styled from 'styled-components';

interface Props{
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    text: string;
}

const DeletePopup: React.FC<Props> = ({isOpen, setOpen, text}) => {
 return (
  <div>

  </div>
 );
};

export default DeletePopup;

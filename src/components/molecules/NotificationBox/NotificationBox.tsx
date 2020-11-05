import React from 'react';
import { DeleteIcon } from '../../../styles/iconStyles';
import { FlexWrapper } from '../../../styles/shared';
import { NotificationWrapper, TextWrapper, Title, Description, NewNotificationDot, Date } from './NotificationBox.styles';

interface Props {
  title: string;
  description: string;
  wasOpened: boolean;
  createdDate: Date;
  onClick?: () => void;
}

const NotificationBox: React.FC<Props> = ({ title, description, wasOpened, createdDate, onClick }) => {
  return (
    <NotificationWrapper>
      <TextWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Date>{createdDate.toLocaleString()}</Date>
      </TextWrapper>
      <FlexWrapper>
        {!wasOpened && <NewNotificationDot />}
        <DeleteIcon onClick={() => !!onClick && onClick()} />
      </FlexWrapper>
    </NotificationWrapper>
  );
};

export default NotificationBox;

import React from 'react';
import styled from 'styled-components';
import ListBox from '../../molecules/ListBox/ListBox';
import {ListBoxProps} from '../../molecules/ListBox/ListBox';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 30px;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 500px;
  }
`;

interface Props {}

const AttendanceList: React.FC<Props> = () => {
  const attendanceArray:Array<any> = [
    {
      name: 'Mariusz Pawelski',
      date: '08/06/1998',
      bottomDescription: 'mariusz.pawelski@gmail.com',
      callback: () => console.log('clicked'),
      isChecked: true,
      hours: 8
    },
    {
      name: 'Michał Boruch',
      date: '08/06/1998',
      bottomDescription: 'michal.boruch@gmail.com',
      callback: () => console.log('clicked'),
      isEmpty: true,
      hours: 0
    },
    {
      name: 'Jacek Kowalski',
      date: '08/06/1998',
      bottomDescription: 'jacek.kowalski@gmail.com',
      callback: () => console.log('clicked'),
      isChecked: false,
    }
  ]
  return (
    <StyledWrapper>
      {attendanceArray.map(attendance => (
        <ListBox
          name={attendance.name}
          date={attendance.date}
          bottomDescription={attendance.bottomDescription}
          callback={() => console.log('attendance clicked')}
          isEmpty={attendance.isChecked ? undefined : attendance.isEmpty}
          isChecked={!attendance.isEmpty && attendance.isChecked}
          hours={attendance.hours ? attendance.hours : undefined}
        />
      ))}
    </StyledWrapper>
  );
};

export default AttendanceList;

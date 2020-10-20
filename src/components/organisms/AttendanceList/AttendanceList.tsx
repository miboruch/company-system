import React from 'react';
import styled from 'styled-components';
import AttendanceBox, { AttendanceBoxProps } from '../../molecules/AttendanceBox/AttendanceBox';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 30px;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    height: 100%;
    grid-area: attendance;
    align-self: center;
  }
`;

interface Props {}

const AttendanceList: React.FC<Props> = () => {
  const attendanceArray: AttendanceBoxProps[] = [
    {
      name: 'Mariusz Pawelski',
      date: '08/06/1998',
      bottomDescription: 'mariusz.pawelski@gmail.com',
      callback: () => console.log('clicked'),
      wasPresent: true,
      hours: 8
    },
    {
      name: 'Michał Boruch',
      date: '08/06/1998',
      bottomDescription: 'michal.boruch@gmail.com',
      callback: () => console.log('clicked'),
      wasPresent: true,
      hours: 0
    },
    {
      name: 'Jacek Kowalski',
      date: '08/06/1998',
      bottomDescription: 'jacek.kowalski@gmail.com',
      callback: () => console.log('clicked'),
      wasPresent: true,
      hours: 7
    }
  ];
  return (
    <StyledWrapper>
      {attendanceArray.map((attendance) => (
        <AttendanceBox
          name={attendance.name}
          date={attendance.date}
          bottomDescription={attendance.bottomDescription}
          callback={() => console.log('attendance clicked')}
          wasPresent={attendance.wasPresent}
          hours={attendance.hours && attendance.hours}
        />
      ))}
    </StyledWrapper>
  );
};

export default AttendanceList;

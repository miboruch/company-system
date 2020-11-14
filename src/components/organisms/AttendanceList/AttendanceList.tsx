import React from 'react';
import styled from 'styled-components';
import { AttendanceInterface } from '../../../types/modelsTypes';
import { isEmpty } from '../../../utils/functions';
import ListBox from '../../molecules/ListBox/ListBox';
import { Heading } from '../../../styles/typography/typography';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  // background-color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    height: 100%;
    min-height: auto;
    grid-area: attendance;
    align-self: center;
  }
`;

const DateHeading = styled(Heading)`
  font-size: 18px;
  margin: 3rem 2rem;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.colors.dark};
`;

interface Props {
  singleDayAttendance: AttendanceInterface[];
  setSelectedAttendance?: React.Dispatch<React.SetStateAction<AttendanceInterface | null>>;
  setAttendanceOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AttendanceList: React.FC<Props> = ({ singleDayAttendance, setSelectedAttendance, setAttendanceOpen }) => {
  return (
    <StyledWrapper>
      {/*<DateParagraph>{new Date().toLocaleDateString()}</DateParagraph>*/}
      <DateHeading>{new Date().toLocaleDateString()}</DateHeading>
      {singleDayAttendance.map((attendance, index: number) => (
        <ListBox
          key={attendance._id}
          name={`${attendance.user.name} ${attendance.user.lastName}`}
          topDescription={new Date().toLocaleDateString()}
          bottomDescription={attendance.user.email}
          isCompanyBox={false}
          isEmpty={isEmpty(attendance.attendance)}
          isChecked={!isEmpty(attendance.attendance) && attendance.attendance?.wasPresent}
          callback={() => {
            !!setSelectedAttendance && setSelectedAttendance(attendance);
            !!setAttendanceOpen && setAttendanceOpen(true);
          }}
          value={attendance.attendance?.wasPresent ? `${attendance.attendance.hours} h` : undefined}
        />
      ))}
    </StyledWrapper>
  );
};

export default AttendanceList;

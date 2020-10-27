import React from 'react';
import styled, { css } from 'styled-components';
import { WeekAttendance } from '../../../types/modelsTypes';
import { EmptyIcon, NotCheckedIcon, CheckedIcon } from '../../../styles/iconStyles';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: ${({ theme }) => theme.colors.impactGray};
  grid-gap: 1px;
`;

const SingleAttendanceWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DateParagraph = styled.p`
  color: ${({ theme }) => theme.colors.emptyText};
  font-size: 13px;
`;

const iconStyles = css`
  margin-right: 0;
  margin-top: 2rem;
`;

const StyledEmptyIcon = styled(EmptyIcon)`
  ${iconStyles};
`;

const StyledCheckedIcon = styled(CheckedIcon)`
  ${iconStyles};
`;

const StyledNotCheckedIcon = styled(NotCheckedIcon)`
  ${iconStyles};
`;

interface Props {
  weekAttendance: WeekAttendance[];
}

const WeekAttendanceComponent: React.FC<Props> = ({ weekAttendance }) => {
  return (
    <StyledWrapper>
      {weekAttendance.map((attendance) => (
        <SingleAttendanceWrapper>
          <DateParagraph>{new Date(attendance.date).toLocaleDateString()}</DateParagraph>
          {attendance.wasPresent === null ? <StyledEmptyIcon /> : attendance.wasPresent ? <StyledCheckedIcon /> : <StyledNotCheckedIcon />}
        </SingleAttendanceWrapper>
      ))}
    </StyledWrapper>
  );
};

export default WeekAttendanceComponent;

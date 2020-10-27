import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { ClientInterface, WeekAttendance } from '../../../types/modelsTypes';
import { EmptyIcon, NotCheckedIcon, CheckedIcon } from '../../../styles/iconStyles';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getCompanyClients, selectClient, setClientInfoOpen } from '../../../actions/clientActions';
import { getWeekAttendance } from '../../../actions/attendanceActions';

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

type ConnectedProps = Props & LinkDispatchProps;

const WeekAttendanceComponent: React.FC<ConnectedProps> = ({ weekAttendance, getWeekAttendance }) => {
  const [weekCounter, setWeekCounter] = useState<number>(0);

  const increaseWeek = (): void => {
    setWeekCounter((prevCounter) => prevCounter + 1);
  };

  const decreaseWeek = (): void => {
    setWeekCounter((prevCounter) => prevCounter - 1);
  };

  useEffect(() => {
    getWeekAttendance(weekCounter);
  }, [weekCounter]);

  return (
    <>
      <p onClick={() => decreaseWeek()}>left</p>
      <p onClick={() => increaseWeek()}>right</p>
      <StyledWrapper>
        {weekAttendance.map((attendance) => (
          <SingleAttendanceWrapper>
            <DateParagraph>{new Date(attendance.date).toLocaleDateString()}</DateParagraph>
            {attendance.wasPresent === null ? <StyledEmptyIcon /> : attendance.wasPresent ? <StyledCheckedIcon /> : <StyledNotCheckedIcon />}
          </SingleAttendanceWrapper>
        ))}
      </StyledWrapper>
    </>
  );
};

interface LinkDispatchProps {
  getWeekAttendance: (week: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getWeekAttendance: bindActionCreators(getWeekAttendance, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(WeekAttendanceComponent);

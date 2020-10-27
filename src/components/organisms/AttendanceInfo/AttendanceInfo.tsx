import React from 'react';
import { connect } from 'react-redux';
import { Wrapper, StyledForm, HeaderWrapper, Paragraph, EmployeeInfoBox, SubParagraph, TextParagraph, Title, InputWrapper } from '../../../styles/contentStyles';
import { SpinnerWrapper } from '../../../styles/sharedStyles';
import { AttendanceInterface, WeekAttendance } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import Spinner from '../../atoms/Spinner/Spinner';
import BarChart from '../../molecules/BarChart/BarChart';
import WeekAttendanceComponent from '../../molecules/WeekAttendanceComponent/WeekAttendanceComponent';

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const AttendanceInfo: React.FC<ConnectedProps> = ({ selectedAttendance, weekAttendance, isContentLoading }) => {
  console.log(selectedAttendance);
  console.log(weekAttendance);
  return (
    <Wrapper>
      {isContentLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        selectedAttendance && (
          <>
            <Paragraph>Data urodzenia: {new Date(selectedAttendance.user.dateOfBirth).toLocaleDateString()}</Paragraph>
            <HeaderWrapper>
              <Title>
                {selectedAttendance.user.name} {selectedAttendance.user.lastName}
              </Title>
              <p>icon</p>
            </HeaderWrapper>
            {weekAttendance && <WeekAttendanceComponent weekAttendance={weekAttendance} />}
          </>
        )
      )}
    </Wrapper>
  );
};

interface LinkStateProps {
  selectedAttendance: AttendanceInterface | null;
  weekAttendance: WeekAttendance[] | null;
  isContentLoading: boolean;
}

const mapStateToProps = ({ attendanceReducer: { selectedAttendance, weekAttendance, isContentLoading } }: AppState): LinkStateProps => {
  return { selectedAttendance, weekAttendance, isContentLoading };
};

export default connect(mapStateToProps)(AttendanceInfo);

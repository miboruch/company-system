import React from 'react';
import { connect } from 'react-redux';
import { Paragraph } from '../../../styles/typography/typography';
import { Wrapper, HeaderWrapper, EmployeeInfoBox, Title } from '../../../styles/contentStyles';
import { SpinnerWrapper } from '../../../styles/shared';
import { AttendanceInterface, WeekAttendance } from '../../../types/modelsTypes';
import { AppState } from '../../../store/test-store';
import Spinner from '../../atoms/Spinner/Spinner';
import WeekAttendanceComponent from '../../molecules/WeekAttendanceComponent/WeekAttendanceComponent';

type ConnectedProps = LinkStateProps;

const AttendanceInfo: React.FC<ConnectedProps> = ({ selectedAttendance, weekAttendance, isContentLoading }) => {
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
            <EmployeeInfoBox>
              <Paragraph type={'subparagraph'}>Email: {selectedAttendance.user.email}</Paragraph>
              <Paragraph type={'subparagraph'}>{selectedAttendance.user.phoneNumber}</Paragraph>
              {/*<SubParagraph>{selectedEmployee.userId.phoneNumber}</SubParagraph>*/}
            </EmployeeInfoBox>
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

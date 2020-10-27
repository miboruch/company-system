import React from 'react';
import { connect } from 'react-redux';
import { Wrapper, StyledForm, HeaderWrapper, Paragraph, EmployeeInfoBox, SubParagraph, TextParagraph, Title, InputWrapper } from '../../../styles/contentStyles';
import { AttendanceInterface, WeekAttendance } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const AttendanceInfo: React.FC<ConnectedProps> = ({selectedAttendance, weekAttendance}) => {
  return (
    <Wrapper>
      {/*<Paragraph>Data dodania: {new Date(selectedTask.addedDate).toLocaleDateString()}</Paragraph>*/}
      <HeaderWrapper>
        {/*<Title>{selectedTask.name}</Title>*/}
        <p>icon</p>
      </HeaderWrapper>
    </Wrapper>
  );
};

interface LinkStateProps {
  selectedAttendance: AttendanceInterface | null;
  weekAttendance: WeekAttendance[] | null;
}

const mapStateToProps = ({ attendanceReducer: { selectedAttendance, weekAttendance } }: AppState): LinkStateProps => {
  return { selectedAttendance, weekAttendance };
};

export default connect(mapStateToProps)(AttendanceInfo);

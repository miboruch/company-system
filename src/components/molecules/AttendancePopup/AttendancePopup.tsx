import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import Input from '../../atoms/Input/Input';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import { AttendanceInterface } from '../../../types/modelsTypes';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { ButtonWrapper, ContentWrapper } from '../../../styles/popupStyles';
import { CheckedIcon, NotCheckedIcon, EmptyIcon } from '../../../styles/iconStyles';
import { FlexWrapper, StyledForm, StyledParagraph, StyledFlexWrapper, InputWrapper } from './AttendancePopup.styles';
import { addAttendance, updateAttendance } from '../../../actions/attendanceActions';

interface Props {
  attendance: AttendanceInterface | null;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  date: Date;
}

interface DefaultValues {
  wasPresent: boolean | null;
  hours: number;
}

type ConnectedProps = Props & LinkDispatchProps;

const AttendancePopup: React.FC<ConnectedProps> = ({ attendance, isOpen, setOpen, updateAttendance, addAttendance, date }) => {
  const initialValues: DefaultValues = {
    wasPresent: !attendance?.attendance ? null : attendance.attendance.wasPresent,
    hours: !attendance?.attendance ? 0 : attendance.attendance.hours
  };

  const handleSubmit = (values: DefaultValues) => {
    setOpen(false);
    if (attendance) {
      if (attendance?.attendance) {
        values.wasPresent !== null && updateAttendance(attendance.attendance._id, values.wasPresent, values.hours);
      } else {
        values.wasPresent !== null && addAttendance(attendance.user._id, date, values.wasPresent, values.hours);
      }
    }
  };

  return (
    <PopupTemplate isOpen={isOpen} headerText={`Obecność z dnia ${date.toLocaleDateString()}`} isHigher={false}>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, values, setFieldValue }) =>
            !!attendance && (
              <StyledForm>
                <ContentWrapper>
                  <FlexWrapper>
                    {values.wasPresent === null ? <EmptyIcon /> : values.wasPresent ? <CheckedIcon /> : <NotCheckedIcon />}
                    <StyledParagraph type={'text'}>
                      {attendance.user.name} {attendance.user.lastName}
                    </StyledParagraph>
                  </FlexWrapper>
                  <StyledFlexWrapper>
                    <StyledParagraph type={'info'}>Obecność</StyledParagraph>
                    <Checkbox onChange={() => setFieldValue('wasPresent', true)} name={'wasPresent'} labelText={'TAK'} checked={values.wasPresent !== null && values.wasPresent} />
                    <Checkbox onChange={() => setFieldValue('wasPresent', false)} name={'wasPresent'} labelText={'NIE'} checked={!values.wasPresent} />
                  </StyledFlexWrapper>
                  <InputWrapper>
                    <Input
                      onChange={handleChange}
                      name={'hours'}
                      required={false}
                      type={'number'}
                      labelText={'Ilość godzin'}
                      disabled={!values.wasPresent}
                      value={!values.wasPresent ? 0 : values.hours}
                    />
                  </InputWrapper>
                </ContentWrapper>
                <ButtonWrapper>
                  <ModalButton onClick={() => setOpen(false)} buttonType={ButtonType.Cancel} text={'Zamknij'} />
                  <ModalButton submit={true} buttonType={ButtonType.Add} text={'Akceptuj'} />
                </ButtonWrapper>
              </StyledForm>
            )
          }
        </Formik>
      </div>
    </PopupTemplate>
  );
};

interface LinkDispatchProps {
  updateAttendance: (attendanceId: string, wasPresent: boolean, hours: number) => void;
  addAttendance: (userId: string, date: Date, wasPresent: boolean, hours: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    updateAttendance: bindActionCreators(updateAttendance, dispatch),
    addAttendance: bindActionCreators(addAttendance, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(AttendancePopup);

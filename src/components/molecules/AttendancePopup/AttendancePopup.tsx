import React from 'react';
import { Formik } from 'formik';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import Input from '../../atoms/Input/Input';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import { AttendanceInterface } from '../../../types/modelsTypes';
import { ButtonWrapper, ContentWrapper } from '../../../styles/popupStyles';
import { CheckedIcon, NotCheckedIcon, EmptyIcon } from '../../../styles/iconStyles';
import { FlexWrapper, StyledForm, StyledParagraph, StyledFlexWrapper, InputWrapper } from './AttendancePopup.styles';
import { addAttendance, updateAttendance } from '../../../ducks/attendance/attendance-creators';
import { AttendanceSchema } from '../../../validation/modelsValidation';
import { useAppDispatch } from '../../../store/test-store';

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

const AttendancePopup: React.FC<Props> = ({ attendance, isOpen, setOpen, date }) => {
  const dispatch = useAppDispatch();
  const initialValues: DefaultValues = {
    wasPresent: !attendance?.attendance ? null : attendance.attendance.wasPresent,
    hours: !attendance?.attendance ? 0 : attendance.attendance.hours
  };

  const handleSubmit = ({ wasPresent, hours }: DefaultValues) => {
    setOpen(false);
    if (attendance) {
      if (attendance?.attendance) {
        wasPresent !== null && dispatch(updateAttendance({ attendanceId: attendance.attendance._id, wasPresent: !!wasPresent, hours }));
      } else {
        wasPresent !== null && dispatch(addAttendance({ userId: attendance.user._id, date, wasPresent: !!wasPresent, hours }));
      }
    }
  };

  return (
    <PopupTemplate isOpen={isOpen} headerText={`Obecność z dnia ${date.toLocaleDateString()}`} isHigher={false}>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true} validationSchema={AttendanceSchema} validateOnChange={false} validateOnBlur={false}>
          {({ handleChange, values, setFieldValue, errors }) =>
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
                      labelText={errors.hours || 'Ilość godzin'}
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

export default AttendancePopup;
